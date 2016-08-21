module.exports = (request, reply) => {
  const { Article } = request.server.app.models
  const { assets } = request.server.app

  const context = {}

  if (request.auth.isAuthenticated) {
    context.user = request.auth.credentials
  }

  return Article.getAll()
    .then(articles => {
      context.articles = articles
      context.script = {
        file: assets.home.js,
        data: { articles },
      }
      return reply.view('pages/home', context)
    })
}
