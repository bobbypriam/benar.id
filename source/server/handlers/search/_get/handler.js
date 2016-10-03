const url = require('url')

module.exports.handleRequest = (request) => {
  const { elasticsearch } = request.server.app.lib
  const { q } = request.query

  if (!q) {
    // No query, just bail out
    return {}
  }

  const data = {}
  data.query = q
  data.isUrlSearch = isUrl(q)
  data.normalizedQuery = data.isUrlSearch ? stripQueryString(data.query) : data.query

  const searchQuery = {
    index: 'benar',
    type: 'articles',
    body: {
      query: {
        match: data.isUrlSearch ? {
          url: data.normalizedQuery,
        } : {
          title: data.normalizedQuery,
        },
      },
    },
  }

  return elasticsearch.search(searchQuery)
    .then(result => {
      if (data.isUrlSearch) {
        const article = result.hits.hits.find(hit => hit._source.url === data.normalizedQuery)
        if (article) {
          data.article = Object.assign({}, article._source, {
            score: article._score,
          })
        }
        return data
      }
      data.hits = result.hits.hits.map(hit => Object.assign({}, hit._source, {
        score: hit._score,
      }))
      return data
    })
}

function isUrl(str) {
  return !!url.parse(str).slashes
}

function stripQueryString(urlString) {
  return urlString.split('?')[0]
}
