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

describe('#get()', () => {
  before(() => Member.create(members.valid[0]))

  it('should return the member with the provided slug', () => {
    const slug = members.valid[0].name_slug
    const promise = Member.get(slug)
    return promise.should.eventually.deep.property('name', members.valid[0].name)
  })
})

describe('#update()', () => {
  let memberId

  before(() => Member
    .create(members.valid[0])
    .then(createdMember => {
      memberId = createdMember.id
    }))

  it('should update member with the new data', () => {
    const newData = {
      name: 'John New',
    }
    const promise = Member.update(memberId, newData)
    return promise.should.eventually.deep.property('name', newData.name)
  })
})

describe('#remove()', () => {
  let memberId

  before(() => Member
    .create(members.valid[0])
    .then(createdMember => {
      memberId = createdMember.id
    }))

  it('should delete member with given memberId', () => {
    const promise = Member.remove(memberId)
    return promise.should.eventually.equal(1)
  })
})

afterEach(() => Member.clear())
