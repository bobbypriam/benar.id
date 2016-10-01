/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const postArticle = require('../../../source/server/handlers/postArticle')

const dummyArticle = {
  title: 'Example Title',
  url: 'http://example.com',
}

const dummyUser = {
  id: 1,
  name_slug: 'foo',
}

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  request.payload = Object.assign({}, dummyArticle)
  request.auth.credentials = dummyUser
  request.server.app.models.Article = {
    create: Sinon.stub(),
  }
  request.server.app.lib.elasticsearch = {
    index: Sinon.stub(),
  }
  request.log = Sinon.spy()
  return request
}

it('should call Article.create(article)', () => {
  const request = generateRequestObject()

  const Article = request.server.app.models.Article
  Article.create.returns(Promise.resolve(dummyArticle))
  const elasticsearch = request.server.app.lib.elasticsearch
  elasticsearch.index.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postArticle(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Article.create)
      Sinon.assert.calledWith(Article.create, Object.assign({}, request.payload, {
        member_id: request.auth.credentials.id,
      }))
    })
})

it('should strip query string from article payload', () => {
  const request = generateRequestObject()

  request.payload = Object.assign({}, dummyArticle, {
    url: `${dummyArticle.url}?foo=bar`,
  })

  const Article = request.server.app.models.Article
  Article.create.returns(Promise.resolve(dummyArticle))
  const elasticsearch = request.server.app.lib.elasticsearch
  elasticsearch.index.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postArticle(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Article.create)
      Sinon.assert.calledWith(Article.create, Object.assign({}, request.payload, {
        member_id: request.auth.credentials.id,
        url: dummyArticle.url,
      }))
    })
})

it('should call elasticsearch.index(obj)', () => {
  const request = generateRequestObject()

  const Article = request.server.app.models.Article
  Article.create.returns(Promise.resolve(dummyArticle))
  const elasticsearch = request.server.app.lib.elasticsearch
  elasticsearch.index.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postArticle(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(elasticsearch.index)
      Sinon.assert.calledWith(elasticsearch.index, Sinon.match.hasOwn('body', dummyArticle))
    })
})

it('should redirect to home if success', () => {
  const request = generateRequestObject()

  const Article = request.server.app.models.Article
  Article.create.returns(Promise.resolve(dummyArticle))
  const elasticsearch = request.server.app.lib.elasticsearch
  elasticsearch.index.returns(Promise.resolve())

  const reply = { redirect: Sinon.spy() }

  return postArticle(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(reply.redirect, '/')
    })
})

it('should redirect to /artikel/baru if promise is rejected', () => {
  const request = generateRequestObject()

  const Article = request.server.app.models.Article
  Article.create.returns(Promise.reject())

  const reply = { redirect: Sinon.spy() }

  return postArticle(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(reply.redirect, '/artikel/baru')
    })
})
