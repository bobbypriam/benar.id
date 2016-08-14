const Article = require('../schema/Article')

module.exports.create = function create(articleData) {
  return Article.query().insert(articleData)
}

module.exports.get = function get(id) {
  return Article
    .query()
    .where('id', id)
    .then(articles => articles[0])
}

module.exports.getAll = function getAll() {
  return Article.query()
}

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Article.query().del()
}
