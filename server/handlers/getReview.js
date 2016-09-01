module.exports = (request, reply) => {
  const { Article } = request.server.app.models

  const articleId = request.params.id
  const reviewerSlug = request.params.reviewerSlug

  const context = {}

  if (request.auth.isAuthenticated) {
    context.user = request.auth.credentials
  }

  Promise.all([
    Article.get(articleId),
    Article.getReview(articleId, reviewerSlug),
  ]).then(results => {
    context.article = results[0]
    context.review = results[1]
    return reply.view('pages/article/review', context)
  })
}
