const { Model } = require('objection')

class ReviewFlag extends Model {
  static get tableName() {
    return 'review_flag'
  }

  static get idColumn() {
    return ['review_id', 'flag_type_id']
  }

  static get relationMappings() {
    return {
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Review`,
        join: {
          from: 'review_flag.review_id',
          to: 'review.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/FlagType`,
        join: {
          from: 'review_flag.flag_type_id',
          to: 'flag_type.id',
        },
      },
    }
  }
}

module.exports = ReviewFlag
