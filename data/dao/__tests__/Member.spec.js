require('./helpers/common').chai.should()

const Member = require('../Member')
const members = require('./fixtures/members')

describe('#create()', () => {
  it('should create a new member if called with valid data', () => {
    const memberData = members[0]
    const promise = Member.create(memberData)
    return promise.should.be.fulfilled
  })
})
