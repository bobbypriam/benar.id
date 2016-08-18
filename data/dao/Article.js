const Article = require('../schema/Article')
const Review = require('../schema/Review')
const Member = require('../schema/Member')
const Feedback = require('../schema/Feedback')

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

module.exports.updateReview = function updateReview(id, reviewerSlug, newData) {
  const memberWithSlug = Member
    .query()
    .select('id')
    .where('name_slug', reviewerSlug)
  return Review
    .query()
    .where('article_id', id)
    .where('member_id', memberWithSlug)
    .then(result => {
      if (!result[0]) {
        throw new Error('Review not found.')
      }
      const review = result[0]
      return review
        .$query()
        .updateAndFetch(newData)
    })
}

module.exports.removeReview = function removeReview(id, reviewerSlug) {
  const memberWithSlug = Member
    .query()
    .select('id')
    .where('name_slug', reviewerSlug)
  return Review
    .query()
    .where('article_id', id)
    .where('member_id', memberWithSlug)
    .del()
}

module.exports.writeReviewFeedback = function writeReviewFeedback(id, reviewerSlug, feedbackData) {
  const memberWithSlug = Member
    .query()
    .select('id')
    .where('name_slug', reviewerSlug)
  return Review
    .query()
    .where('article_id', id)
    .where('member_id', memberWithSlug)
    .then(result => {
      if (!result[0]) {
        throw new Error('Review not found.')
      }

      const newFeedbackData = Object.assign({}, feedbackData, {
        review_id: result[0].id,
      })

      return Feedback.query().insert(newFeedbackData)
    })
}

module.exports.getReviewFeedbacks = function getReviewFeedbacks(id, reviewerSlug) {
  const memberWithSlug = Member
    .query()
    .select('id')
    .where('name_slug', reviewerSlug)
  const review = Review
    .query()
    .select('id')
    .where('article_id', id)
    .where('member_id', memberWithSlug)
  return Feedback
    .query()
    .where('review_id', review)
}

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Article.query().del()
}
