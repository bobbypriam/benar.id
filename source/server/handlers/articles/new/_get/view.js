module.exports = (request, reply) => {
  const context = {}
  context.user = request.auth.credentials
  return reply.view('pages/article/new', context)
}
