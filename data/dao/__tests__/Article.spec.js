require('./helpers/common').chai.should()

const Portal = require('../Portal')
const Member = require('../Member')
const Article = require('../Article')
const portals = require('./fixtures/portals')
const members = require('./fixtures/members')
const articles = require('./fixtures/articles')

let portalId
let memberId

before(() =>
  Promise.all([
    Portal.create(portals.valid[0])
      .then(createdPortal => { portalId = createdPortal.id }),
    Member.create(members.valid[0])
      .then(createdMember => { memberId = createdMember.id }),
  ])
)

describe('#create()', () => {
  it('should create a new portal if called with valid data', () => {
    const articleData = Object.assign({}, articles.valid[0], {
      portal_id: portalId,
      member_id: memberId,
    })
    const promise = Article.create(articleData)
    return promise.should.be.fulfilled
  })
  it('should reject if portal id is not provided', () => {
    const articleData = Object.assign({}, articles.valid[0], {
      member_id: memberId,
    })
    const promise = Article.create(articleData)
    return promise.should.be.rejected
  })
  it('should reject if member id is not provided', () => {
    const articleData = Object.assign({}, articles.valid[0], {
      portal_id: portalId,
    })
    const promise = Article.create(articleData)
    return promise.should.be.rejected
  })
  it('should reject if title is not provided', () => {
    const articleData = Object.assign({}, articles.invalid.noTitle, {
      portal_id: portalId,
      member_id: memberId,
    })
    const promise = Article.create(articleData)
    return promise.should.be.rejected
  })
  it('should reject if url is not provided', () => {
    const articleData = Object.assign({}, articles.invalid.noUrl, {
      portal_id: portalId,
      member_id: memberId,
    })
    const promise = Article.create(articleData)
    return promise.should.be.rejected
  })
})

afterEach(() => Article.clear())

after(() => Promise.all([
  Portal.clear(),
  Member.clear(),
]))
