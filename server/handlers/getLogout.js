module.exports = (request, reply) => {
  if (request.auth.isAuthenticated) {
    request.cookieAuth.clear()
  }

  return reply.redirect('/')
}
