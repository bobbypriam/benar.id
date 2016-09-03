require('./helpers/common').chai.should()

const Portal = require('../Portal')
const Member = require('../Member')
const Article = require('../Article')
const Review = require('../Review')
const ReviewVote = require('../ReviewVote')
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

describe('#upvote()', () => {
  let reviewId

  beforeEach(() =>
    Article.writeReview(
      articleId,
      Object.assign({}, reviews.valid[0], {
        member_id: memberId,
      })
    ).then(createdReview => { reviewId = createdReview.id })
  )

  it('should upvote the review', () => {
    const promise = Review.upvote(reviewId, memberId)
    return promise.should.be.fulfilled
  })

  it('shouldn\'t allow upvoting twice', () => {
    const promise = Review.upvote(reviewId, memberId)
      .then(() => Review.upvote(reviewId, memberId))
    return promise.should.be.rejected
  })

  afterEach(() =>
    ReviewVote.clear()
    .then(() => Review.clear())
  )
})

after(() =>
  Article.clear()
    .then(() => Promise.all([
      Portal.clear(),
      Member.clear(),
    ])
))
