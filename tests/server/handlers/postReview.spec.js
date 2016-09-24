/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const postReview = require('../../../source/server/handlers/postReview')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyUser = {
  id: 1,
  name_slug: 'foo',
}

it('should call Article.writeReview(articleId, review)', () => {
  const request = generateRequestObject()

  request.payload = { foo: 'bar' }
  request.params.id = 1
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    writeReview: Sinon.stub(),
  }
  Article.writeReview.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Article.writeReview)
      Sinon.assert.calledWith(
        Article.writeReview,
        request.params.id,
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
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    writeReview: Sinon.stub(),
  }
  Article.writeReview.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(reply.redirect, `/artikel/${request.params.id}`)
    })
})

it('should redirect to article page if promise is rejected', () => {
  const request = generateRequestObject()

  request.payload = { foo: 'bar' }
  request.params.id = 1
  request.auth.credentials = dummyUser
  request.log = Sinon.spy()

  const Article = request.server.app.models.Article = {
    writeReview: Sinon.stub(),
  }
  Article.writeReview.returns(Promise.reject())

  const reply = { redirect: Sinon.spy() }

  return postReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(reply.redirect, `/artikel/${request.params.id}`)
    })
})
