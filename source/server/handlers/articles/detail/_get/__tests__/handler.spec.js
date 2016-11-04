const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const sinon = require('sinon')

const handler = require('../handler')

const dummyArticle = { id: 1 }

function generateRequestObject() {
  const request = { server: { app: { models: {} } } }
  request.params = { id: dummyArticle.id }
  request.server.app.models.Article = {
    get: sinon.stub().returns(Promise.resolve(dummyArticle)),
  }
  return request
}

describe('Article Detail Handler', () => {
  it('should call Article.get(id)', () => {
    const request = generateRequestObject()
    const { Article } = request.server.app.models

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(Article.get)
        sinon.assert.calledWith(Article.get, request.params.id)
      })
  })

  it('returned data should contain article', () => {
    const request = generateRequestObject()

    const promise = handler.handleRequest(request)

    return promise.should.eventually.have.all.keys('article')
  })
})
