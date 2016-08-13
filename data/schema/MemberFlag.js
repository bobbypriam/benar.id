const { Model } = require('objection')

class MemberFlag extends Model {
  static get tableName() {
    return 'member_flag'
  }

  static get idColumn() {
    return ['member_id', 'flag_type_id']
  }

  static get relationMappings() {
    return {
      member: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Member`,
        join: {
          from: 'member_flag.member_id',
          to: 'member.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/FlagType`,
        join: {
          from: 'member_flag.flag_type_id',
          to: 'flag_type.id',
        },
      },
    }
  }
}

module.exports = MemberFlag
