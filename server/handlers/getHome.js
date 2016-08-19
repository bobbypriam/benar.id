module.exports = (request, reply) => {
  const { Article } = request.server.app.models

  const context = {}

  if (request.auth.isAuthenticated) {
    context.user = request.auth.credentials
  }

  return Article.getAll()
    .then(articles => {
      context.articles = articles
      return reply.view('pages/index', context)
    })
}
