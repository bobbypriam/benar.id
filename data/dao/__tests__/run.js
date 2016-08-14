const setup = require('./helpers/setup')

function importTest(name, path) {
  describe(name, () => {
    require(path) // eslint-disable-line
  })
}

describe('DAO tests', () => {
  before(function initTestDb() {
    this.timeout(10000)
    console.log('  ### CREATING TEST DATABASE AND TABLES ###')
    return setup.createTestDb()
      .then(() => setup.initTestTables())
  })

  importTest('Member', './Member.spec')

  after(() => {
    console.log('  ### DESTROYING TEST DATABASE AND TABLES ###')
    return setup.destroyTestDb()
  })
})
