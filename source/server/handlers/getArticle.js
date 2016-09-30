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

      if (request.auth.isAuthenticated) {
        context.user.reviewed = article.reviews
          .filter(review =>
            review.member.id === context.user.id
          ).length > 0
      }

      context.script = {
        file: assets['article-detail'].js,
        data: {
          articleId: article.id,
          reviews: article.reviews,
        },
      }

      return reply.view('pages/article/detail', context)
    })
    .catch(() => reply('Not found.'))
}
