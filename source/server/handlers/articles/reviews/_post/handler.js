module.exports.handleRequest = (request) => {
  const { Article } = request.server.app.models
  const memberData = request.auth.credentials
  const review = request.payload
  const articleId = request.params.id
  review.member_id = memberData.id
  return Article.writeReview(articleId, review)
    .then(createdReview => ({ review: createdReview }))
}
