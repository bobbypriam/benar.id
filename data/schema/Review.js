const Model = require('./BaseModel')

const voteTypes = {
  UPVOTE: 1,
  DOWNVOTE: 2,
}

class Review extends Model {
  static get tableName() {
    return 'review'
  }

  static get voteTypes() {
    return voteTypes
  }

  static get relationMappings() {
    return {
      article: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Article`,
        join: {
          from: 'review.article_id',
          to: 'article.id',
        },
      },
      member: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Member`,
        join: {
          from: 'review.member_id',
          to: 'member.id',
        },
      },
      feedbacks: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Feedback`,
        join: {
          from: 'review.id',
          to: 'feedback.review_id',
        },
      },
      upvotes: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/ReviewVote`,
        filter: {
          vote_type_id: voteTypes.UPVOTE,
        },
        join: {
          from: 'review.id',
          to: 'review_vote.review_id',
        },
      },
      downvotes: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/ReviewVote`,
        filter: {
          vote_type_id: voteTypes.DOWNVOTE,
        },
        join: {
          from: 'review.id',
          to: 'review_vote.review_id',
        },
      },
      flags: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/ReviewFlag`,
        join: {
          from: 'review.id',
          to: 'review_flag.review_id',
        },
      },
    }
  }
}

module.exports = Review
