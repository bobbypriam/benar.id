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

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Member.query().del()
}
