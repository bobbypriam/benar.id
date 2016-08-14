require('./helpers/common').chai.should()

const Member = require('../Member')

describe('#create()', () => {
  it('should create a new member if called with valid data', () => {
    const memberData = {
      email: '',
    }
    const promise = Member.create(memberData)
    return promise.should.be.fulfilled
  })
})
