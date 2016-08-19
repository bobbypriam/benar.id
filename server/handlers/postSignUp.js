const slugify = require('slugify')

module.exports = (request, reply) => {
  const { Member } = request.server.app.models

  const { name, email } = request.payload
  const nameSlug = slugify(name)

  const memberData = {
    name,
    email,
    name_slug: nameSlug,
  }

  return Member.create(memberData)
    .then(member => {
      request.cookieAuth.set({
        id: member.id,
        slug: member.name_slug,
      })

      return reply.redirect('/')
    })
}
