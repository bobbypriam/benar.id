module.exports = (request, reply) => {
  const memberData = request.auth.credentials
  const { Article } = request.server.app.models
  const article = request.payload
  article.member_id = memberData.id

  // REVIEW: would stripping query string trigger weird behavior?
  article.url = stripQueryString(article.url)

  return Article.create(article)
    .then(() => reply.redirect('/'))
    .catch(err => {
      request.log(['database', 'error'], err)
      return reply.redirect('/artikel/baru')
    })
}

function stripQueryString(url) {
  return url.split('?')[0]
}
