require('./helpers/common').chai.should()

const Portal = require('../Portal')
const Member = require('../Member')
const Article = require('../Article')
const Review = require('../Review')
const Feedback = require('../Feedback')
const portals = require('./fixtures/portals')
const members = require('./fixtures/members')
const articles = require('./fixtures/articles')
const reviews = require('./fixtures/reviews')
const feedbacks = require('./fixtures/reviews')

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

describe('#getReview()', () => {
  let articleId
  let otherMemberId

  before(() =>
    Promise.all([
      // Create other member
      Member.create(members.valid[1])
        .then(createdMember => { otherMemberId = createdMember.id }),
      // Create article reviews
      Article
        .create(Object.assign({}, articles.valid[0], {
          portal_id: portalId,
          member_id: memberId,
        }))
        .then(createdArticle => { articleId = createdArticle.id })
        .then(() => {
          const promises = [
            Article.writeReview(articleId, Object.assign({}, reviews.valid[0], {
              member_id: memberId,
            })),
            Article.writeReview(articleId, Object.assign({}, reviews.valid[1], {
              member_id: otherMemberId,
            })),
          ]
          return Promise.all(promises)
        }),
    ])
  )

  it('should return a review based on the reviewer\'s slug', () => {
    const slug = members.valid[0].name_slug
    const promise = Article.getReview(articleId, slug)
    return promise.should.eventually.deep.property('content', reviews.valid[0].content)
  })

  it('should return null if review with provided reviewer is not found', () => {
    const slug = 'Nonexistent-Member'
    const promise = Article.getReview(articleId, slug)
    return promise.should.eventually.be.null
  })
})

describe('#updateReview()', () => {
  let articleId

  before(() =>
    Article
      .create(Object.assign({}, articles.valid[0], {
        portal_id: portalId,
        member_id: memberId,
      }))
      .then(createdArticle => { articleId = createdArticle.id })
      .then(() =>
        Article.writeReview(articleId, Object.assign({}, reviews.valid[0], {
          member_id: memberId,
        }))
      )
  )

  it('should update a review based on the reviewer\'s slug', () => {
    const slug = members.valid[0].name_slug
    const newReviewData = { content: '<p>New Content</p>' }
    const promise = Article.updateReview(articleId, slug, newReviewData)
    return promise.should.eventually.deep.property('content', newReviewData.content)
  })
})

describe('#removeReview()', () => {
  let articleId

  before(() =>
    Article
      .create(Object.assign({}, articles.valid[0], {
        portal_id: portalId,
        member_id: memberId,
      }))
      .then(createdArticle => { articleId = createdArticle.id })
      .then(() =>
        Article.writeReview(articleId, Object.assign({}, reviews.valid[0], {
          member_id: memberId,
        }))
      )
  )

  it('should delete review with given articleId and reviewerSlug', () => {
    const slug = members.valid[0].name_slug
    const promise = Article.removeReview(articleId, slug)
    return promise.should.eventually.equal(1)
  })
})

describe('#writeReviewFeedback()', () => {
  let articleId

  before(() =>
    Article
      .create(Object.assign({}, articles.valid[0], {
        portal_id: portalId,
        member_id: memberId,
      }))
      .then(createdArticle => { articleId = createdArticle.id })
      .then(() =>
        Article.writeReview(articleId, Object.assign({}, reviews.valid[0], {
          member_id: memberId,
        }))
      )
  )

  it('should add a feedback to a review', () => {
    const slug = members.valid[0].name_slug
    const feedbackData = Object.assign({}, feedbacks.valid[0], {
      member_id: memberId,
    })
    const promise = Article.writeReviewFeedback(articleId, slug, feedbackData)
    return promise.should.be.fulfilled
  })
})

describe('#getReviewFeedbacks()', () => {
  it('should get all feedbacks for a review')
})

afterEach(() =>
  Feedback.clear()
    .then(() => Review.clear())
    .then(() => Article.clear())
)

after(() => Promise.all([
  Portal.clear(),
  Member.clear(),
]))
