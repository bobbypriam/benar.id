module.exports = (request, reply) => {
  const { Article } = request.server.app.models

  const articleId = request.params.id
  const reviewerSlug = request.params.reviewerSlug

  const context = {}

  if (request.auth.isAuthenticated) {
    context.user = request.auth.credentials
  }

  return Article.getReview(articleId, reviewerSlug)
    .then(review => {
      context.review = review

      if (context.user) {
        context.user.ownReview = context.user.id === context.review.member.id
      }

      if (context.user && !context.user.ownReview) {
        context.user.upvoted = context.review.upvotes
          .filter(
            vote => vote.member_id === context.user.id
          ).length > 0

        context.user.downvoted = context.review.downvotes
          .filter(
            vote => vote.member_id === context.user.id
          ).length > 0

        context.user.voted = context.user.upvoted || context.user.downvoted
      }

      return reply.view('pages/article/review', context)
    })
}
