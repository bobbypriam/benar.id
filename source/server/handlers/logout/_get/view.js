const handleRequest = require('./handler')

module.exports = (request, reply) =>
  handleRequest(request)
    .then(() => reply.redirect('/'))
