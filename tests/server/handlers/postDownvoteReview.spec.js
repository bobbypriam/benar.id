/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const postDownvoteReview = require('../../../source/server/handlers/postDownvoteReview')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyUser = {
  id: 1,
  name_slug: 'foo',
}

it('should call Review.downvote(reviewId, memberId)', () => {
  const request = generateRequestObject()

  request.payload = { reviewId: 1 }
  request.params.id = 1
  request.params.reviewerSlug = 'baz'
  request.auth.credentials = dummyUser

  const Review = request.server.app.models.Review = {
    downvote: Sinon.stub(),
  }
  Review.downvote.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postDownvoteReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Review.downvote)
      Sinon.assert.calledWith(
        Review.downvote,
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
    downvote: Sinon.stub(),
  }
  Review.downvote.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postDownvoteReview(request, reply)
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
    downvote: Sinon.stub(),
  }
  Review.downvote.returns(Promise.reject())

  const reply = { redirect: Sinon.spy() }

  return postDownvoteReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(
        reply.redirect,
        `/artikel/${request.params.id}/ulasan/${request.params.reviewerSlug}`
      )
    })
})
