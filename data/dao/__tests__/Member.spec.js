const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const setup = require('./helpers/setup')

const Member = require('../Member')

describe('Member DAO', () => {
  before(function initTestDb() {
    this.timeout(10000)
    return setup.createTestDb()
      .then(() => setup.initTestTables())
  })

  describe('#create()', () => {
    it('should resolve if called with valid data', () => {
      const memberData = {
        email: '',
      }
      const promise = Member.create(memberData)
      return promise.should.be.fulfilled
    })
  })

  after(() => setup.destroyTestDb())
})
