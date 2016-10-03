const handler = require('./handler')

module.exports = (request, reply) =>
  handler.handleRequest(request)
    .then(data => reply.redirect(`/artikel/${data.articleId}`))
    .catch(err => {
      request.log(['database', 'error'], err)
      return reply.redirect('/artikel/baru')
    })
