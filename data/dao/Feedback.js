const Feedback = require('../schema/Feedback')

module.exports.writeReply = function writeReply(id, data) {
  return Feedback
    .query()
    .where('id', id)
    .then(result => {
      if (!result[0]) {
        throw new Error('Feedback not found.')
      }

      const feedback = result[0]

      return Feedback
        .query()
        .insert(Object.assign({}, data, {
          parent_feedback_id: id,
          review_id: feedback.review_id,
        }))
    })
}

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Feedback
    .query()
    // Reverse sort the feedbacks to prevent
    // foreign key errors upon deletion
    .orderBy('id', 'desc')
    .then(feedbacks => {
      const promises = feedbacks.map(feedback =>
        feedback.$query().del()
      )
      return Promise.all(promises)
    })
}
