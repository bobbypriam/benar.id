module.exports = (request) => {
  const memberData = request.auth.credentials
  const { Article } = request.server.app.models
  const { elasticsearch } = request.server.app.lib
  const article = request.payload
  article.member_id = memberData.id
  article.url = stripQueryString(article.url)
  return Article.create(article)
    .then(createdArticle => elasticsearch.index({
      index: 'benar',
      type: 'articles',
      id: createdArticle.id,
      body: createdArticle,
    }))
}

function stripQueryString(url) {
  return url.split('?')[0]
}
