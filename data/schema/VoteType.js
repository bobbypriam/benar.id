const { Model } = require('objection')

class VoteType extends Model {
  static get tableName() {
    return 'vote_type'
  }
}

module.exports = VoteType
