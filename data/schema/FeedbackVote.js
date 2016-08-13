const { Model } = require('objection')

class FeedbackVote extends Model {
  static get tableName() {
    return 'feedback_vote'
  }

  static get idColumn() {
    return ['feedback_id', 'member_id']
  }

  static get relationMappings() {
    return {
      feedback: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Feedback`,
        join: {
          from: 'feedback_vote.feedback_id',
          to: 'feedback.id',
        },
      },
      member: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Member`,
        join: {
          from: 'feedback_vote.member_id',
          to: 'member.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/VoteType`,
        join: {
          from: 'feedback_vote.vote_type_id',
          to: 'vote_type.id',
        },
      },
    }
  }
}

module.exports = FeedbackVote
