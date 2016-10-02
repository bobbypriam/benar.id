const handleRequest = require('./handler')

module.exports = (request, reply) =>
  handleRequest(request)
    .then(() => reply.redirect('/'))
    .catch(err => {
      request.log(['database', 'error'], err)
      return reply.redirect('/artikel/baru')
    })
