module.exports.handleRequest = (request) => {
  const { Member } = request.server.app.models
  const { email } = request.payload
  return Member.getByEmail(email)
    .then(member => {
      request.cookieAuth.set({
        id: member.id,
        slug: member.name_slug,
      })
      return { member }
    })
}
