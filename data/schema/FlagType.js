const Model = require('./BaseModel')

class FlagType extends Model {
  static get tableName() {
    return 'flag_type'
  }
}

module.exports = FlagType
