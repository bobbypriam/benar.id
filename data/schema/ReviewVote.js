const Model = require('./BaseModel')

class ReviewVote extends Model {
  static get tableName() {
    return 'review_vote'
  }

  static get idColumn() {
    return ['review_id', 'member_id']
  }

  static get relationMappings() {
    return {
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Review`,
        join: {
          from: 'review_vote.review_id',
          to: 'review.id',
        },
      },
      member: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Member`,
        join: {
          from: 'review_vote.member_id',
          to: 'member.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/VoteType`,
        join: {
          from: 'review_vote.vote_type_id',
          to: 'vote_type.id',
        },
      },
    }
  }
}

module.exports = ReviewVote
