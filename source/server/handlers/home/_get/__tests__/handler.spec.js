const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const Sinon = require('sinon')

const handler = require('../handler')

function generateRequestObject() {
  const request = { server: { app: { models: {} } } }
  request.server.app.models.Article = {
    getAll: Sinon.stub().returns(Promise.resolve([])),
  }
  return request
}

describe('Home Handler', () => {
  it('should call Article.getAll()', () => {
    const request = generateRequestObject()
    const { Article } = request.server.app.models

    handler.handleRequest(request)

    Sinon.assert.calledOnce(Article.getAll)
  })

  it('returned data should contain articles', () => {
    const request = generateRequestObject()

    const promise = handler.handleRequest(request)

    return promise.should.eventually.have.all.keys('articles')
  })
})
