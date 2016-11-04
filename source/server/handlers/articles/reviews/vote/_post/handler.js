module.exports.handleRequest = (method) => (request) => {
  const { Review } = request.server.app.models
  const memberData = request.auth.credentials
  const { reviewId } = request.payload
  return Review[method](reviewId, memberData.id)
}
