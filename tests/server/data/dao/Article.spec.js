require('../../helpers/common').chai.should()

const Portal = require('../../../../source/server/data/dao/Portal')
const Member = require('../../../../source/server/data/dao/Member')
const Article = require('../../../../source/server/data/dao/Article')
const Review = require('../../../../source/server/data/dao/Review')
const Feedback = require('../../../../source/server/data/dao/Feedback')

const portals = require('./fixtures/portals')
const members = require('./fixtures/members')
const articles = require('./fixtures/articles')
const reviews = require('./fixtures/reviews')
const feedbacks = require('./fixtures/feedbacks')

let portalId
let memberId
let memberSlug

before(() =>
  Promise.all([
    Portal.create(portals.valid[0])
      .then(createdPortal => { portalId = createdPortal.id }),
    Member.create(members.valid[0])
      .then(createdMember => {
        memberId = createdMember.id
        memberSlug = createdMember.name_slug
      }),
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
  it('should fulfill if portal id is not provided', () => {
    const articleData = Object.assign({}, articles.valid[0], {
      member_id: memberId,
    })
    const promise = Article.create(articleData)
    return promise.should.be.fulfilled
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

  afterEach(() => Article.clear())
})

describe('#get()', () => {
  let articleId

  beforeEach(() =>
    Article.create(Object.assign({}, articles.valid[0], {
      portal_id: portalId,
      member_id: memberId,
    })).then(createdArticle => { articleId = createdArticle.id })
  )

  it('should return the article with the provided id', () => {
    const promise = Article.get(articleId)
    return promise.should.eventually.deep.property('title', articles.valid[0].title)
  })

  afterEach(() => Article.clear([articleId]))
})

describe('#getAll()', () => {
  beforeEach(() => {
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

  afterEach(() => Article.clear())
})

describe('#update()', () => {
  let articleId

  beforeEach(() =>
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

  afterEach(() => Article.clear([articleId]))
})

describe('#remove()', () => {
  let articleId

  beforeEach(() =>
    Article.create(Object.assign({}, articles.valid[0], {
      portal_id: portalId,
      member_id: memberId,
    })).then(createdArticle => { articleId = createdArticle.id })
  )

  it('should delete article with given articleId', () => {
    const promise = Article.remove(articleId)
    return promise.should.eventually.equal(1)
  })

  afterEach(() => Article.clear([articleId]))
})

describe('#writeReview()', () => {
  let articleId

  beforeEach(() =>
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

  it('should reject if member has written an entry', () => {
    const reviewData = Object.assign({}, reviews.valid[0], {
      member_id: memberId,
    })

    const promise = Article.writeReview(articleId, reviewData)
      .then(() => Article.writeReview(articleId, reviewData))

    return promise.should.be.rejected
  })

  afterEach(() =>
    Review.clear()
      .then(() => Article.clear([articleId]))
  )
})

describe('#getReviews()', () => {
  let articleId
  let otherMemberId

  beforeEach(() =>
    // Create other member
    Member.create(members.valid[1])
      .then(createdMember => { otherMemberId = createdMember.id })
      // Create article reviews
      .then(() => Article.create(Object.assign({}, articles.valid[0], {
        portal_id: portalId,
        member_id: memberId,
      })))
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
      })
  )

  it('should fetch all reviews of an article', () => {
    const promise = Article.getReviews(articleId)
    return promise.should.eventually.have.length(reviews.valid.length)
  })

  afterEach(() =>
    Review.clear()
      .then(() => Article.clear([articleId]))
      .then(() => Member.clear([otherMemberId]))
  )
})

describe('#getReview()', () => {
  let articleId
  let otherMemberId

  beforeEach(() =>
    // Create other member
    Member.create(members.valid[1])
      .then(createdMember => { otherMemberId = createdMember.id })
      // Create article reviews
      .then(() => Article.create(Object.assign({}, articles.valid[0], {
        portal_id: portalId,
        member_id: memberId,
      })))
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
      })
  )

  it('should return a review based on the reviewer\'s slug', () => {
    const slug = memberSlug
    const promise = Article.getReview(articleId, slug)
    return promise.should.eventually.deep.property('content', reviews.valid[0].content)
  })

  it('should return null if review with provided reviewer is not found', () => {
    const slug = 'Nonexistent-Member'
    const promise = Article.getReview(articleId, slug)
    return promise.should.eventually.be.null
  })

  afterEach(() =>
    Review.clear()
      .then(() => Article.clear([articleId]))
      .then(() => Member.clear([otherMemberId]))
  )
})

describe('#updateReview()', () => {
  let articleId

  beforeEach(() =>
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
    const slug = memberSlug
    const newReviewData = { content: '<p>New Content</p>' }
    const promise = Article.updateReview(articleId, slug, newReviewData)
    return promise.should.eventually.deep.property('content', newReviewData.content)
  })

  afterEach(() =>
    Review.clear()
      .then(() => Article.clear([articleId]))
  )
})

describe('#removeReview()', () => {
  let articleId

  beforeEach(() =>
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
    const slug = memberSlug
    const promise = Article.removeReview(articleId, slug)
    return promise.should.eventually.equal(1)
  })

  afterEach(() =>
    Review.clear()
      .then(() => Article.clear([articleId]))
  )
})

describe('#writeReviewFeedback()', () => {
  let articleId

  beforeEach(() =>
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
    const slug = memberSlug
    const feedbackData = Object.assign({}, feedbacks.valid[0], {
      member_id: memberId,
    })
    const promise = Article.writeReviewFeedback(articleId, slug, feedbackData)
    return promise.should.be.fulfilled
  })

  afterEach(() =>
    Feedback.clear()
      .then(() => Review.clear())
      .then(() => Article.clear([articleId]))
  )
})

describe('#getReviewFeedbacks()', () => {
  let articleId

  beforeEach(() =>
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
      .then(() => {
        const promises = feedbacks.valid.map(feedback =>
          Article.writeReviewFeedback(
            articleId,
            memberSlug,
            Object.assign({}, feedback, {
              member_id: memberId,
            })
          )
        )
        return Promise.all(promises)
      })
  )

  it('should get all feedbacks for a review', () => {
    const slug = memberSlug
    const promise = Article.getReviewFeedbacks(articleId, slug)
    return promise.should.eventually.have.length(feedbacks.valid.length)
  })

  afterEach(() =>
    Feedback.clear()
      .then(() => Review.clear())
      .then(() => Article.clear([articleId]))
  )
})

after(() => Promise.all([
  Portal.clear(),
  Member.clear(),
]))
