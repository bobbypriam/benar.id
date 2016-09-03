module.exports = (request, reply) => {
  const { Review } = request.server.app.models

  const memberData = request.auth.credentials

  const { reviewId } = request.payload
  const articleId = request.params.id
  const reviewerSlug = request.params.reviewerSlug

  return Review.downvote(reviewId, memberData.id)
    .then(() => reply.redirect(`/artikel/${articleId}/ulasan/${reviewerSlug}`))
    .catch(err => {
      request.log(['database', 'error'], err)
      return reply.redirect(`/artikel/${articleId}/ulasan/${reviewerSlug}`)
    })
}
