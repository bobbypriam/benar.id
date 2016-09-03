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

    if (context.user) {
      context.user.ownReview = context.user.id === context.review.member.id
    }

    return reply.view('pages/article/review', context)
  })
}
