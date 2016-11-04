module.exports.handleRequest = (request) => {
  const { Article } = request.server.app.models
  const articleId = request.params.id
  return Article.get(articleId)
    .then(article => ({ article }))
}
