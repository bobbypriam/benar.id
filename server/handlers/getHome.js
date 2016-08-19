module.exports = (request, reply) => {
  console.log(request.server.app)
  return reply.view('pages/index')
}
