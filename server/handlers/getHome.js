module.exports = (request, reply) => {
  if (request.auth.isAuthenticated) {
    const memberData = request.auth.credentials
    console.log('Authenticated', memberData)
  } else {
    console.log('Not authenticated')
  }
  return reply.view('pages/index')
}
