module.exports.handleRequest = (request) => {
  const { Member } = request.server.app.models
  const { name, email } = request.payload
  const memberData = {
    name,
    email,
  }
  return Member.create(memberData)
    .then(member => {
      request.cookieAuth.set({
        id: member.id,
        slug: member.name_slug,
      })
      return { member }
    })
}
