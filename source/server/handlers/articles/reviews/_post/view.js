const handleRequest = require('./handler')

module.exports = (request, reply) =>
  handleRequest(request)
    .then(() => reply.redirect(`/artikel/${request.params.id}`))
    .catch(err => {
      request.log(['database', 'error'], err)
      return reply.redirect(`/artikel/${request.params.id}`)
    })
