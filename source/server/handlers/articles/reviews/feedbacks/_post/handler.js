module.exports = (request) => {
  const { Article } = request.server.app.models
  const memberData = request.auth.credentials
  const feedback = request.payload
  const articleId = request.params.id
  const reviewerSlug = request.params.reviewerSlug
  feedback.member_id = memberData.id
  return Article.writeReviewFeedback(articleId, reviewerSlug, feedback)
}
