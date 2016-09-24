/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const postFeedbackReply = require('../../../source/server/handlers/postFeedbackReply')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyUser = {
  id: 1,
  name_slug: 'foo',
}

it('should call Feedback.writeReply(parentFeedbackId, feedback)', () => {
  const request = generateRequestObject()

  request.payload = { foo: 'bar' }
  request.params.id = 1
  request.params.reviewerSlug = 'baz'
  request.params.parentFeedbackId = 2
  request.auth.credentials = dummyUser

  const Feedback = request.server.app.models.Feedback = {
    writeReply: Sinon.stub(),
  }
  Feedback.writeReply.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postFeedbackReply(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Feedback.writeReply)
      Sinon.assert.calledWith(
        Feedback.writeReply,
        request.params.parentFeedbackId,
        Object.assign({}, request.payload, {
          member_id: request.auth.credentials.id,
        })
      )
    })
})

it('should redirect to article page if success', () => {
  const request = generateRequestObject()

  request.payload = { foo: 'bar' }
  request.params.id = 1
  request.params.reviewerSlug = 'baz'
  request.params.parentFeedbackId = 2
  request.auth.credentials = dummyUser

  const Feedback = request.server.app.models.Feedback = {
    writeReply: Sinon.stub(),
  }
  Feedback.writeReply.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postFeedbackReply(request, reply)
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

  request.payload = { foo: 'bar' }
  request.params.id = 1
  request.params.reviewerSlug = 'baz'
  request.params.parentFeedbackId = 2
  request.auth.credentials = dummyUser
  request.log = Sinon.spy()

  const Feedback = request.server.app.models.Feedback = {
    writeReply: Sinon.stub(),
  }
  Feedback.writeReply.returns(Promise.reject())

  const reply = { redirect: Sinon.spy() }

  return postFeedbackReply(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(
        reply.redirect,
        `/artikel/${request.params.id}/ulasan/${request.params.reviewerSlug}`
      )
    })
})
