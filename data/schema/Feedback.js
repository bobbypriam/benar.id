const Model = require('./BaseModel')

class Feedback extends Model {
  static get tableName() {
    return 'feedback'
  }

  static get relationMappings() {
    return {
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Review`,
        join: {
          from: 'feedback.review_id',
          to: 'review.id',
        },
      },
      member: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Member`,
        join: {
          from: 'feedback.member_id',
          to: 'member.id',
        },
      },
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: Feedback,
        join: {
          from: 'feedback.parent_id',
          to: 'feedback.id',
        },
      },
      replies: {
        relation: Model.HasManyRelation,
        modelClass: Feedback,
        join: {
          from: 'feedback.id',
          to: 'feedback.parent_id',
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/FeedbackVote`,
        join: {
          from: 'feedback.id',
          to: 'feedback_vote.feedback_id',
        },
      },
      flags: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/FeedbackFlag`,
        join: {
          from: 'feedback.id',
          to: 'feedback_flag.feedback_id',
        },
      },
    }
  }
}

module.exports = Feedback
