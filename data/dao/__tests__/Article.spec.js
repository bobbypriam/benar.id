require('./helpers/common').chai.should()

const Portal = require('../Portal')
const Member = require('../Member')
const Article = require('../Article')
const Review = require('../Review')
const portals = require('./fixtures/portals')
const members = require('./fixtures/members')
const articles = require('./fixtures/articles')
const reviews = require('./fixtures/reviews')

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
  it('should create a new article if called with valid data', () => {
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

describe('#get()', () => {
  let articleId

  before(() =>
    Article.create(Object.assign({}, articles.valid[0], {
      portal_id: portalId,
      member_id: memberId,
    })).then(createdArticle => { articleId = createdArticle.id })
  )

  it('should return the article with the provided id', () => {
    const promise = Article.get(articleId)
    return promise.should.eventually.deep.property('title', articles.valid[0].title)
  })
})

describe('#getAll()', () => {
  before(() => {
    const promises = articles.valid.map(article => Article.create(Object.assign({}, article, {
      portal_id: portalId,
      member_id: memberId,
    })))
    return Promise.all(promises)
  })

  it('should return all articles', () => {
    const promise = Article.getAll()
    return promise.should.eventually.have.length(articles.valid.length)
  })
})

describe('#update()', () => {
  let articleId

  before(() =>
    Article.create(Object.assign({}, articles.valid[0], {
      portal_id: portalId,
      member_id: memberId,
    })).then(createdArticle => { articleId = createdArticle.id })
  )

  it('should update article with the new data', () => {
    const newData = {
      title: 'New Title',
    }
    const promise = Article.update(articleId, newData)
    return promise.should.eventually.deep.property('title', newData.title)
  })
})

describe('#remove()', () => {
  let articleId

  before(() =>
    Article.create(Object.assign({}, articles.valid[0], {
      portal_id: portalId,
      member_id: memberId,
    })).then(createdArticle => { articleId = createdArticle.id })
  )

  it('should delete article with given articleId', () => {
    const promise = Article.remove(articleId)
    return promise.should.eventually.equal(1)
  })
})

describe('#writeReview()', () => {
  let articleId

  before(() =>
    Article.create(Object.assign({}, articles.valid[0], {
      portal_id: portalId,
      member_id: memberId,
    })).then(createdArticle => { articleId = createdArticle.id })
  )

  it('should create a new review entry', () => {
    const reviewData = Object.assign({}, reviews.valid[0], {
      member_id: memberId,
    })
    const promise = Article.writeReview(articleId, reviewData)
    return promise.should.be.fulfilled
  })
})

describe('#getReviews()', () => {
  let articleId

  before(() =>
    Article
      .create(Object.assign({}, articles.valid[0], {
        portal_id: portalId,
        member_id: memberId,
      }))
      .then(createdArticle => { articleId = createdArticle.id })
      .then(() => {
        const promises = reviews.valid.map(review =>
          Article.writeReview(articleId, Object.assign({}, review, {
            member_id: memberId,
          }))
        )
        return Promise.all(promises)
      })
  )

  it('should fetch all reviews of an article', () => {
    const promise = Article.getReviews(articleId)
    return promise.should.eventually.have.length(reviews.valid.length)
  })
})

afterEach(() =>
  Review.clear()
    .then(() => Article.clear())
)

after(() => Promise.all([
  Portal.clear(),
  Member.clear(),
]))
