const Model = require('./BaseModel')

class PortalFlag extends Model {
  static get tableName() {
    return 'portal_flag'
  }

  static get idColumn() {
    return ['portal_id', 'flag_type_id']
  }

  static get relationMappings() {
    return {
      portal: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Portal`,
        join: {
          from: 'portal_flag.portal_id',
          to: 'portal.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/FlagType`,
        join: {
          from: 'portal_flag.flag_type_id',
          to: 'flag_type.id',
        },
      },
    }
  }
}

module.exports = PortalFlag
