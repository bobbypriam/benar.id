require('./helpers/common').chai.should()

const Member = require('../Member')
const members = require('./fixtures/members')

describe('#create()', () => {
  it('should create a new member if called with valid data', () => {
    const memberData = members.valid[0]
    const promise = Member.create(memberData)
    return promise.should.be.fulfilled
  })
  it('should reject if no email is provided', () => {
    const memberData = members.invalid.noEmail
    const promise = Member.create(memberData)
    return promise.should.be.rejected
  })
  it('should reject if no name is provided', () => {
    const memberData = members.invalid.noName
    const promise = Member.create(memberData)
    return promise.should.be.rejected
  })
  it('should reject if no name slug is provided', () => {
    const memberData = members.invalid.noNameSlug
    const promise = Member.create(memberData)
    return promise.should.be.rejected
  })
})

afterEach(() => Member.clear())
