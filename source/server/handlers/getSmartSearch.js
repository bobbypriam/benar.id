const url = require('url')

module.exports = (request, reply) => {
  const { elasticsearch } = request.server.app.lib
  const { q } = request.query

  const searchQuery = {
    index: 'benar',
    type: 'articles',
    body: {
      query: {
        match: isUrl(q) ? {
          url: stripQueryString(q),
        } : {
          title: q,
        },
      },
    },
  }

  return elasticsearch.search(searchQuery)
    .then(result => {
      if (isUrl(q)) {
        const normalizedUrl = stripQueryString(q)
        const article = result.hits.hits.find(hit => hit._source.url === normalizedUrl)

        if (article) {
          return reply.redirect(`/artikel/${article._source.id}`)
        }
      }
      const response =
        `<p>Searching: ${q}</p>
        <ul>
          ${result.hits.hits.map(hit =>
            `<li>
              <p>${hit._source.title}</p>
              <p>${hit._source.url}</p>
              <p>${hit._score}</p>
            </li>`
          )}
        </ul>`

      return reply(response)
    })
    .catch(err => {
      reply(err)
    })
}

function isUrl(str) {
  return !!url.parse(str).slashes
}

function stripQueryString(urlString) {
  return urlString.split('?')[0]
}
