const { Model } = require('objection')

class Article extends Model {
  static get tableName() {
    return 'article'
  }

  static get relationMappings() {
    return {
      portal: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Portal`,
        join: {
          from: 'article.portal_id',
          to: 'portal.id',
        },
      },
      member: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Member`,
        join: {
          from: 'article.member_id',
          to: 'member.id',
        },
      },
      topics: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/Topic`,
        join: {
          from: 'article.id',
          through: {
            from: 'article_topic.article_id',
            to: 'article_topic.topic_id',
          },
          to: 'topic.id',
        },
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Review`,
        join: {
          from: 'article.id',
          to: 'review.article_id',
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/ArticleVote`,
        join: {
          from: 'article.id',
          to: 'article_vote.article_id',
        },
      },
      flags: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/ArticleFlag`,
        join: {
          from: 'article.id',
          to: 'article_flag.article_id',
        },
      },
    }
  }
}

module.exports = Article
