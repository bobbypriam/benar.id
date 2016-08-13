const { Model } = require('objection')

class ArticleVote extends Model {
  static get tableName() {
    return 'article_vote'
  }

  static get idColumn() {
    return ['article_id', 'member_id']
  }

  static get relationMappings() {
    return {
      article: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Article`,
        join: {
          from: 'article_vote.article_id',
          to: 'article.id',
        },
      },
      member: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Member`,
        join: {
          from: 'article_vote.member_id',
          to: 'member.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/VoteType`,
        join: {
          from: 'article_vote.vote_type_id',
          to: 'vote_type.id',
        },
      },
    }
  }
}

module.exports = ArticleVote
