require('./helpers/common').chai.should()

const slugify = require('slugify')

const Member = require('../../../../source/server/data/dao/Member')

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
})

describe('#generateSlug', () => {
  it('should generate a default slug if no member with the same slug exists', () => {
    const memberData = members.valid[0]
    const promise = Member.generateSlug(memberData.name)
    return promise.should.eventually.equal(slugify(memberData.name))
  })
  it('should append an index to the slug if a member exists', done => {
    const memberData = members.valid[0]
    Member.create(memberData)
      .then(member =>
        Member.generateSlug(memberData.name)
          .then(slug => {
            slug.should.not.equal(member.name_slug)
            slug.should.equal(`${member.name_slug}-1`)
            done()
          })
      )
      .catch(done)
  })
  it('should append an index to the slug if two members exist', done => {
    const memberData = members.valid[0]
    const otherMemberData = Object.assign({}, members.valid[1], {
      name: members.valid[0].name,
    })
    Member.create(memberData)
      .then(member => {
        memberData.name_slug = member.name_slug
        return Member.create(otherMemberData)
      })
      .then(member => {
        otherMemberData.name_slug = member.name_slug

        Member.generateSlug(memberData.name)
          .then(slug => {
            slug.should.not.equal(memberData.name_slug)
            slug.should.not.equal(otherMemberData.name_slug)
            slug.should.equal(`${memberData.name_slug}-2`)
            done()
          })
      })
      .catch(done)
  })
  it('reject if member with same name sign up in parallel', () => {
    // TODO: Should this really be rejected?
    const memberData = members.valid[0]
    const otherMemberData = Object.assign({}, members.valid[1], {
      name: members.valid[0].name,
    })
    const promise = Promise.all([
      Member.create(memberData),
      Member.create(otherMemberData),
    ])
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

describe('#getByEmail()', () => {
  before(() => Member.create(members.valid[0]))

  it('should return the member with the provided email', () => {
    const email = members.valid[0].email
    const promise = Member.getByEmail(email)
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
