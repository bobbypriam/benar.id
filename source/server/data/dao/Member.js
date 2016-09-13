const slugify = require('slugify')

const Member = require('../schema/Member')

module.exports.create = function create(memberData) {
  return generateSlug(memberData.name)
    .then(slug =>
      Member.query().insert(Object.assign({}, memberData, {
        name_slug: slug,
      }))
    )
}

module.exports.get = function get(slug) {
  return Member
    .query()
    .where('name_slug', slug)
    .then(members => members[0])
}

module.exports.getByEmail = function getByEmail(email) {
  return Member
    .query()
    .where('email', email)
    .then(members => members[0])
}

module.exports.update = function update(id, data) {
  return Member
    .query()
    .updateAndFetchById(id, data)
}

module.exports.remove = function remove(id) {
  return Member
    .query()
    .where('id', id)
    .del()
}

// Private functions

function generateSlug(name) {
  if (!name) {
    return Promise.reject('Name is required.')
  }
  const slug = slugify(name)
  return Member
    .query()
    .where('name_slug', 'like', `${slug}%`)
    .orderBy('id', 'desc')
    .limit(1)
    .then(members => {
      if (!members[0]) {
        return slug
      }

      const slugParts = members[0].name_slug.split('-')
      const lastPart = Number(slugParts[slugParts.length - 1])

      if (Number.isNaN(lastPart)) {
        return `${slug}-1`
      }

      return `${slug}-${lastPart + 1}`
    })
}

// Exports for testing

module.exports.generateSlug = generateSlug

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear(ids) {
  if (ids) {
    return Member.query().whereIn('id', ids).del()
  }
  return Member.query().del()
}
