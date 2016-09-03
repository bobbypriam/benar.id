const ReviewVote = require('../schema/ReviewVote')

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return ReviewVote.query().del()
}
