const Article = require('../schema/Article')
const Review = require('../schema/Review')
const Member = require('../schema/Member')

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

module.exports.getReviews = function getReviews(id) {
  return Review
    .query()
    .where('article_id', id)
}

module.exports.getReview = function getReview(id, reviewerSlug) {
  const memberWithSlug = Member
    .query()
    .select('id')
    .where('name_slug', reviewerSlug)
  return Review
    .query()
    .where('article_id', id)
    .where('member_id', memberWithSlug)
    .then(result => result[0] || null)
}

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Article.query().del()
}
