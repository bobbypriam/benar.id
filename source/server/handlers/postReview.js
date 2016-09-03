module.exports = (request, reply) => {
  const { Article } = request.server.app.models

  const memberData = request.auth.credentials

  const review = request.payload
  const articleId = request.params.id

  review.member_id = memberData.id

  return Article.writeReview(articleId, review)
    .then(() => reply.redirect(`/artikel/${articleId}`))
    .catch(err => {
      request.log(['database', 'error'], err)
      return reply.redirect(`/artikel/${articleId}`)
    })
}
