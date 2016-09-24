/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const postArticle = require('../../../source/server/handlers/postArticle')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyUser = {
  id: 1,
  name_slug: 'foo',
}

it('should call Article.create(article)', () => {
  const request = generateRequestObject()

  request.payload = { foo: 'bar' }
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    create: Sinon.stub(),
  }
  Article.create.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postArticle(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Article.create)
      Sinon.assert.calledWith(Article.create, Object.assign({}, request.payload, {
        member_id: request.auth.credentials.id,
      }))
    })
})

it('should redirect to home if success', () => {
  const request = generateRequestObject()

  request.payload = { foo: 'bar' }
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    create: Sinon.stub(),
  }
  Article.create.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postArticle(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(reply.redirect, '/')
    })
})

it('should redirect to /artikel/baru if promise is rejected', () => {
  const request = generateRequestObject()

  request.payload = { foo: 'bar' }
  request.auth.credentials = dummyUser
  request.log = Sinon.spy()

  const Article = request.server.app.models.Article = {
    create: Sinon.stub(),
  }
  Article.create.returns(Promise.reject())

  const reply = { redirect: Sinon.spy() }

  return postArticle(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(reply.redirect, '/artikel/baru')
    })
})
