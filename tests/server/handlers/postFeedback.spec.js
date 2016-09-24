/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const postFeedback = require('../../../source/server/handlers/postFeedback')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyUser = {
  id: 1,
  name_slug: 'foo',
}

it('should call Article.writeReviewFeedback(articleId, reviewerSlug, feedback)', () => {
  const request = generateRequestObject()

  request.payload = { foo: 'bar' }
  request.params.id = 1
  request.params.reviewerSlug = 'baz'
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    writeReviewFeedback: Sinon.stub(),
  }
  Article.writeReviewFeedback.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postFeedback(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Article.writeReviewFeedback)
      Sinon.assert.calledWith(
        Article.writeReviewFeedback,
        request.params.id,
        request.params.reviewerSlug,
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
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    writeReviewFeedback: Sinon.stub(),
  }
  Article.writeReviewFeedback.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postFeedback(request, reply)
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
  request.auth.credentials = dummyUser
  request.log = Sinon.spy()

  const Article = request.server.app.models.Article = {
    writeReviewFeedback: Sinon.stub(),
  }
  Article.writeReviewFeedback.returns(Promise.reject())

  const reply = { redirect: Sinon.spy() }

  return postFeedback(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(
        reply.redirect,
        `/artikel/${request.params.id}/ulasan/${request.params.reviewerSlug}`
      )
    })
})
