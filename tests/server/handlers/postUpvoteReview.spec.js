/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const postUpvoteReview = require('../../../source/server/handlers/postUpvoteReview')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyUser = {
  id: 1,
  name_slug: 'foo',
}

it('should call Review.upvote(reviewId, memberId)', () => {
  const request = generateRequestObject()

  request.payload = { reviewId: 1 }
  request.params.id = 1
  request.params.reviewerSlug = 'baz'
  request.auth.credentials = dummyUser

  const Review = request.server.app.models.Review = {
    upvote: Sinon.stub(),
  }
  Review.upvote.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postUpvoteReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Review.upvote)
      Sinon.assert.calledWith(
        Review.upvote,
        request.payload.reviewId,
        request.auth.credentials.id
      )
    })
})

it('should redirect to article page if success', () => {
  const request = generateRequestObject()

  request.payload = { reviewId: 1 }
  request.params.id = 1
  request.params.reviewerSlug = 'baz'
  request.auth.credentials = dummyUser

  const Review = request.server.app.models.Review = {
    upvote: Sinon.stub(),
  }
  Review.upvote.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postUpvoteReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(
        reply.redirect,
        `/artikel/${request.params.id}/ulasan/${request.params.reviewerSlug}`
      )
    })
})

it('should redirect to article page if promise is rejected', () => {
  const request = generateRequestObject()

  request.payload = { reviewId: 1 }
  request.params.id = 1
  request.params.reviewerSlug = 'baz'
  request.auth.credentials = dummyUser
  request.log = Sinon.spy()

  const Review = request.server.app.models.Review = {
    upvote: Sinon.stub(),
  }
  Review.upvote.returns(Promise.reject())

  const reply = { redirect: Sinon.spy() }

  return postUpvoteReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(
        reply.redirect,
        `/artikel/${request.params.id}/ulasan/${request.params.reviewerSlug}`
      )
    })
})
