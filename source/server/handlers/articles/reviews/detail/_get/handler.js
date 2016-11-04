module.exports.handleRequest = (request) => {
  const { Article } = request.server.app.models
  const articleId = request.params.id
  const reviewerSlug = request.params.reviewerSlug
  return Article.getReview(articleId, reviewerSlug)
    .then(review => ({ review }))
}
