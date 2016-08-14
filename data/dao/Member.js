const Member = require('../schema/Member')

module.exports.create = function create(memberData) {
  return Member.query().insert(memberData)
}

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Member.query().del()
}
