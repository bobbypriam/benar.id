module.exports = (request, reply) => {
  const { Article } = request.server.app.models

  const memberData = request.auth.credentials

  const feedback = request.payload
  const articleId = request.params.id
  const reviewerSlug = request.params.reviewerSlug

  feedback.member_id = memberData.id

  return Article.writeReviewFeedback(articleId, reviewerSlug, feedback)
    .then(() => reply.redirect(`/artikel/${articleId}/ulasan/${reviewerSlug}`))
    .catch(err => {
      request.log(['database', 'error'], err)
      return reply.redirect(`/artikel/${articleId}/ulasan/${reviewerSlug}`)
    })
}
