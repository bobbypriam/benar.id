const { Model } = require('objection')

class ArticleFlag extends Model {
  static get tableName() {
    return 'article_flag'
  }

  static get idColumn() {
    return ['article_id', 'flag_type_id']
  }

  static get relationMappings() {
    return {
      article: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Article`,
        join: {
          from: 'article_flag.article_id',
          to: 'article.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/FlagType`,
        join: {
          from: 'article_flag.flag_type_id',
          to: 'flag_type.id',
        },
      },
    }
  }
}

module.exports = ArticleFlag
