module.exports = (request) => {
  if (request.auth.isAuthenticated) {
    request.cookieAuth.clear()
  }
  return Promise.resolve()
}
