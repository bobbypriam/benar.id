module.exports = (request, reply) => {
  const memberData = request.auth.credentials
  const { Article } = request.server.app.models
  const article = request.payload
  article.member_id = memberData.id

  return Article.create(article)
    .then(() => reply.redirect('/'))
    .catch(err => {
      request.log(['database', 'error'], err)
      return reply.redirect('/artikel/baru')
    })
}
