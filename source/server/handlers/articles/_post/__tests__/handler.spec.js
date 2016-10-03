const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const sinon = require('sinon')

const handler = require('../handler')

const dummyUser = { id: 1, name_slug: 'slug' }

const dummyArticle = { id: 1, title: 'Title', url: 'http://test.com' }

function generateRequestObject() {
  const request = { server: { app: { models: {}, lib: {} } }, auth: {} }
  request.server.app.models.Article = {
    create: sinon.stub().returns(Promise.resolve(dummyArticle)),
  }
  request.server.app.lib.elasticsearch = {
    index: sinon.stub().returns(Promise.resolve()),
  }
  request.payload = dummyArticle
  request.auth.credentials = dummyUser
  return request
}

describe('Post Article Handler', () => {
  it('should strip queryString from article payload', () => {
    const request = generateRequestObject()
    request.payload = Object.assign({}, request.payload, {
      url: `${request.payload.url}?foo=bar`,
    })
    const { Article } = request.server.app.models

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(Article.create)
        sinon.assert.calledWith(Article.create, Object.assign({}, request.payload, {
          member_id: request.auth.credentials.id,
          url: dummyArticle.url,
        }))
      })
  })

  it('should call Article.create(article)', () => {
    const request = generateRequestObject()
    const { Article } = request.server.app.models

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(Article.create)
        sinon.assert.calledWith(Article.create, Object.assign({}, request.payload, {
          member_id: request.auth.credentials.id,
        }))
      })
  })

  it('should call elasticsearch.index with id and body of article', () => {
    const request = generateRequestObject()
    const { elasticsearch } = request.server.app.lib

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(elasticsearch.index)
        sinon.assert.calledWith(elasticsearch.index, sinon.match.hasOwn('id', dummyArticle.id))
        sinon.assert.calledWith(elasticsearch.index, sinon.match.hasOwn('body', dummyArticle))
      })
  })

  it('returned data should contain articleId', () => {
    const request = generateRequestObject()

    const promise = handler.handleRequest(request)

    return promise.should.eventually.have.all.keys('articleId')
  })
})
