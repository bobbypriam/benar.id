const Review = require('../schema/Review')

module.exports.create = function create(reviewData) {
  return Review.query().insert(reviewData)
}

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Review.query().del()
}
