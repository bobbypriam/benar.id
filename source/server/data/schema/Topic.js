const Model = require('./BaseModel')

class Topic extends Model {
  static get tableName() {
    return 'topic'
  }

  static get relationMappings() {
    return {
      articles: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/Article`,
        join: {
          from: 'topic.id',
          through: {
            from: 'article_topic.topic_id',
            to: 'article_topic.article_id',
          },
          to: 'article.id',
        },
      },
    }
  }
}

module.exports = Topic
