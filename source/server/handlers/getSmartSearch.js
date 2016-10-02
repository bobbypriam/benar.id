const url = require('url')

module.exports = (request, reply) => {
  const { assets } = request.server.app
  const { elasticsearch } = request.server.app.lib
  const { q } = request.query
  const authenticated = request.auth.isAuthenticated

  if (!q) {
    return reply.redirect('/')
  }

  const context = {}

  context.query = q

  if (authenticated) {
    context.user = request.auth.credentials
  }

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
        } else if (authenticated) {
          return reply.redirect('/artikel/baru')
        }
        return reply('Artikel tidak ditemukan.')
      }

      context.hits = result.hits.hits.map(hit => Object.assign({}, hit._source, {
        score: hit._score,
      }))

      context.script = {
        file: assets.home.js,
        data: { articles: context.hits },
      }

      return reply.view('pages/search', context)
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
