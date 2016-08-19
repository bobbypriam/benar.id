module.exports = (request, reply) => {
  const context = {}

  context.user = request.auth.credentials

  reply.view('pages/article/new', context)
}
