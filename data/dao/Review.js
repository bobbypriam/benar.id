const Review = require('../schema/Review')
const ReviewVote = require('../schema/ReviewVote')

const reviewVoteTypes = {
  UPVOTE: 1,
  DOWNVOTE: 2,
}

module.exports.upvote = function upvote(reviewId, memberId) {
  return ReviewVote
    .query()
    .insert({
      review_id: reviewId,
      member_id: memberId,
      vote_type_id: reviewVoteTypes.UPVOTE,
    })
}

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Review.query().del()
}
