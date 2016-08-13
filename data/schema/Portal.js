const { Model } = require('objection')

class Portal extends Model {
  static get tableName() {
    return 'portal'
  }

  static get relationMappings() {
    return {
      articles: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Article`,
        join: {
          from: 'portal.id',
          to: 'article.portal_id',
        },
      },
      flags: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/FlagType`,
        join: {
          from: 'portal.id',
          through: {
            from: 'portal_flag.portal_id',
            to: 'portal_flag.flag_type_id',
          },
          to: 'flag_type.id',
        },
      },
    }
  }
}

module.exports = Portal
