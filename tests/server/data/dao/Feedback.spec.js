require('./helpers/common').chai.should()

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

let articleId
let memberId
let memberSlug
let feedbackId

beforeEach(() =>
  Promise.all([
    Portal.create(portals.valid[0]),
    Member.create(members.valid[0]),
  ])
    .then(result => {
      memberId = result[1].id
      memberSlug = result[1].name_slug
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
        memberSlug,
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

describe('#update()', () => {
  it('should update feedback with the new data', () => {
    const newData = {
      content: '<p>new content</p>',
    }
    const promise = Feedback.update(feedbackId, newData)
    return promise.should.eventually.deep.property('content', newData.content)
  })
})

afterEach(() =>
  Feedback.clear()
    .then(() => Review.clear())
    .then(() => Article.clear())
    .then(() => Promise.all([
      Portal.clear(),
      Member.clear(),
    ]))
)
