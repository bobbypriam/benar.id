const { Model } = require('objection')

class FlagType extends Model {
  static get tableName() {
    return 'flag_type'
  }
}

module.exports = FlagType
