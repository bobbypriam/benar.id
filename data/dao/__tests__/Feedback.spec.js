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

let articleId
let memberId
let feedbackId

before(() =>
  Promise.all([
    Portal.create(portals.valid[0]),
    Member.create(members.valid[0]),
  ])
    .then(result => {
      memberId = result[1].id
      return Article.create(Object.assign({}, articles.valid[0], {
        portal_id: result[0].id,
        member_id: result[1].id,
      }))
    })
    .then(createdArticle => {
      articleId = createdArticle.id
      return Article.writeReview(
        articleId,
        Object.assign({}, reviews.valid[0], {
          member_id: memberId,
        })
      )
    })
    .then(() =>
      // Create feedback
      Article.writeReviewFeedback(
        articleId,
        members.valid[0].name_slug,
        Object.assign({}, feedbacks.valid[0], {
          member_id: memberId,
        })
      )
    )
    .then(createdFeedback => { feedbackId = createdFeedback.id })
)

describe('#writeReply()', () => {
  it('should add a reply to a feedback', () => {
    const feedbackData = Object.assign({}, feedbacks.valid[0], {
      member_id: memberId,
    })
    const promise = Feedback.writeReply(feedbackId, feedbackData)
    return promise.should.eventually.deep.property('parent_feedback_id', feedbackId)
  })
})

after(() =>
  Feedback.clear()
    .then(() => Review.clear())
    .then(() => Article.clear())
    .then(() => Promise.all([
      Portal.clear(),
      Member.clear(),
    ]))
)
