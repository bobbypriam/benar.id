const handleRequest = require('./handler')

module.exports = (request, reply) =>
  handleRequest(request)
    .then(data => {
      const context = {}
      if (request.auth.isAuthenticated) {
        context.user = request.auth.credentials
      }
      context.articles = data.articles
      return reply.view('pages/home', context)
    })
    .catch(err => {
      request.log(['error'], err)
      return reply('There\'s something wrong.')
    })
