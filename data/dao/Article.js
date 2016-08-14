const Article = require('../schema/Article')

module.exports.create = function create(articleData) {
  return Article.query().insert(articleData)
}

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Article.query().del()
}
