const Member = require('../schema/Member')

module.exports.create = function create(memberData) {
  return Member.query().insert(memberData)
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

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Member.query().del()
}
