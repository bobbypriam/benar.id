const Article = require('../schema/Article')
const Review = require('../schema/Review')

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

module.exports.update = function update(id, data) {
  return Article
    .query()
    .updateAndFetchById(id, data)
}

module.exports.remove = function remove(id) {
  return Article
    .query()
    .where('id', id)
    .del()
}

module.exports.writeReview = function writeReview(id, data) {
  return Review
    .query()
    .insert(Object.assign({}, data, {
      article_id: id,
    }))
}

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Article.query().del()
}
