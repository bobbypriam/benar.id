const { Model } = require('objection')

class Role extends Model {
  static get tableName() {
    return 'role'
  }

  static get relationMappings() {
    return {
      members: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/Member`,
        join: {
          from: 'role.id',
          through: {
            from: 'member_role.role_id',
            to: 'member_role.member_id',
          },
          to: 'member.id',
        },
      },
    }
  }
}

module.exports = Role
