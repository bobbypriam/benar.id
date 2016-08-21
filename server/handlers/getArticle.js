module.exports = (request, reply) => {
  const { Article } = request.server.app.models
  const { assets } = request.server.app

  const articleId = request.params.id

  const context = {}

  if (request.auth.isAuthenticated) {
    context.user = request.auth.credentials
  }

  return Article.get(articleId)
    .then(article => {
      context.article = article
      context.script = {
        file: assets['article-detail'].js,
        data: { article },
      }
      return reply.view('pages/article/detail', context)
    })
    .catch(() => reply('Not found.'))
}
