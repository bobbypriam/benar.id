const Review = require('../schema/Review')
const ReviewVote = require('../schema/ReviewVote')

const reviewVoteTypes = Review.voteTypes

module.exports.upvote = function upvote(reviewId, memberId) {
  return ReviewVote
    .query()
    .insert({
      review_id: reviewId,
      member_id: memberId,
      vote_type_id: reviewVoteTypes.UPVOTE,
    })
}

module.exports.revokeUpvote = function upvote(reviewId, memberId) {
  return ReviewVote
    .query()
    .where('review_id', reviewId)
    .where('member_id', memberId)
    .where('vote_type_id', reviewVoteTypes.UPVOTE)
    .limit(1)
    .del()
}

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Review.query().del()
}
