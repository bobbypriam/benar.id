module.exports.handleRequest = (request) => {
  if (request.auth.isAuthenticated) {
    request.cookieAuth.clear()
  }
  return Promise.resolve()
}
