module.exports = (request, reply) => {
  const { Article } = request.server.app.models

  const articleId = request.params.id

  const context = {}

  if (request.auth.isAuthenticated) {
    context.user = request.auth.credentials
  }

  return Article.get(articleId)
    .then(article => {
      context.article = article
      return reply.view('pages/article/detail', context)
    })
    .catch(() => reply('Not found.'))
}
