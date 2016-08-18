const Model = require('./BaseModel')

class Member extends Model {
  static get tableName() {
    return 'member'
  }

  static get relationMappings() {
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Review`,
        join: {
          from: 'member.id',
          to: 'review.member_id',
        },
      },
      feedbacks: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Feedback`,
        join: {
          from: 'member.id',
          to: 'feedback.member_id',
        },
      },
      role: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/Role`,
        join: {
          from: 'member.id',
          through: {
            from: 'member_role.member_id',
            to: 'member_role.role_id',
          },
          to: 'role.id',
        },
      },
      flags: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/MemberFlag`,
        join: {
          from: 'member.id',
          to: 'member_flag.member_id',
        },
      },
    }
  }
}

module.exports = Member
