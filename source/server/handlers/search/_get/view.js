const handler = require('./handler')

module.exports = (request, reply) =>
  handler.handleRequest(request)
    .then(data => {
      if (!data.query) {
        return reply.redirect('/')
      }
      if (data.isUrlSearch) {
        if (data.article) {
          return reply.redirect(`/artikel/${data.article.id}`)
        }
        if (request.auth.isAuthenticated) {
          return reply.redirect('/artikel/baru')
        }
        // TODO: notify to create an account to post article
        return reply('Artikel tidak ditemukan.')
      }
      const context = {}
      context.articles = data.hits
      if (request.auth.isAuthenticated) {
        context.user = request.auth.credentials
      }
      context.hits = data.hits
      return reply.view('pages/search', context)
    })
    .catch(err => {
      request.log(['error'], err)
      return reply('There\'s something wrong.')
    })
