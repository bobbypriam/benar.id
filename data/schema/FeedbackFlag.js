const { Model } = require('objection')

class FeedbackFlag extends Model {
  static get tableName() {
    return 'feedback_flag'
  }

  static get idColumn() {
    return ['feedback_id', 'flag_type_id']
  }

  static get relationMappings() {
    return {
      feedback: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Feedback`,
        join: {
          from: 'feedback_flag.feedback_id',
          to: 'feedback.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/FlagType`,
        join: {
          from: 'feedback_flag.flag_type_id',
          to: 'flag_type.id',
        },
      },
    }
  }
}

module.exports = FeedbackFlag
