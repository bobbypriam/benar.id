require('./helpers/common').chai.should()

const Portal = require('../Portal')
const Member = require('../Member')
const Article = require('../Article')
const Review = require('../Review')
const portals = require('./fixtures/portals')
const members = require('./fixtures/members')
const articles = require('./fixtures/articles')
const reviews = require('./fixtures/reviews')

let articleId
let memberId

before(() =>
  Promise.all([
    Portal.create(portals.valid[0]),
    Member.create(members.valid[0]),
  ]).then(result => {
    memberId = result[1].id
    return Article.create(Object.assign({}, articles.valid[0], {
      portal_id: result[0].id,
      member_id: result[1].id,
    }))
  }).then(createdArticle => {
    articleId = createdArticle.id
  })
)

describe('#create()', () => {
  it('should create a new review if called with valid data', () => {
    const reviewData = Object.assign({}, reviews.valid[0], {
      article_id: articleId,
      member_id: memberId,
    })
    const promise = Review.create(reviewData)
    return promise.should.be.fulfilled
  })
  it('should reject if article id is not provided', () => {
    const reviewData = Object.assign({}, reviews.valid[0], {
      member_id: memberId,
    })
    const promise = Review.create(reviewData)
    return promise.should.be.rejected
  })
  it('should reject if member id is not provided', () => {
    const reviewData = Object.assign({}, reviews.valid[0], {
      article_id: articleId,
    })
    const promise = Review.create(reviewData)
    return promise.should.be.rejected
  })
  it('should reject if content is not provided', () => {
    const reviewData = Object.assign({}, reviews.invalid.noTitle, {
      article_id: articleId,
      member_id: memberId,
    })
    const promise = Review.create(reviewData)
    return promise.should.be.rejected
  })
})

afterEach(() => Review.clear())

after(() =>
  Article.clear()
    .then(() => Promise.all([
      Portal.clear(),
      Member.clear(),
    ])
))
