module.exports = (request, reply) => {
  const context = {}

  if (request.auth.isAuthenticated) {
    context.user = request.auth.credentials
  }

  return reply.view('pages/index', context)
}
