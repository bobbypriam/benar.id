/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const postRevokeUpvoteReview = require('../../../source/server/handlers/postRevokeUpvoteReview')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyUser = {
  id: 1,
  name_slug: 'foo',
}

it('should call Review.revokeUpvote(reviewId, memberId)', () => {
  const request = generateRequestObject()

  request.payload = { reviewId: 1 }
  request.params.id = 1
  request.params.reviewerSlug = 'baz'
  request.auth.credentials = dummyUser

  const Review = request.server.app.models.Review = {
    revokeUpvote: Sinon.stub(),
  }
  Review.revokeUpvote.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postRevokeUpvoteReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Review.revokeUpvote)
      Sinon.assert.calledWith(
        Review.revokeUpvote,
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
    revokeUpvote: Sinon.stub(),
  }
  Review.revokeUpvote.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postRevokeUpvoteReview(request, reply)
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
    revokeUpvote: Sinon.stub(),
  }
  Review.revokeUpvote.returns(Promise.reject())

  const reply = { redirect: Sinon.spy() }

  return postRevokeUpvoteReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(
        reply.redirect,
        `/artikel/${request.params.id}/ulasan/${request.params.reviewerSlug}`
      )
    })
})
