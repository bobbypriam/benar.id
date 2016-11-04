const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const sinon = require('sinon')

const handler = require('../handler')

const dummyReview = { id: 1 }

function generateRequestObject() {
  const request = { server: { app: { models: {} } } }
  request.server.app.models.Article = {
    getReview: sinon.stub().returns(Promise.resolve(dummyReview)),
  }
  request.params = { id: 1, reviewerSlug: 'foo' }
  return request
}

describe('Review Detail Handler', () => {
  it('should call Article.getReview(articleId, reviewerSlug)', () => {
    const request = generateRequestObject()
    const { Article } = request.server.app.models

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(Article.getReview)
        sinon.assert.calledWith(
          Article.getReview,
          request.params.id,
          request.params.reviewerSlug
        )
      })
  })

  it('returned data should contain review', () => {
    const request = generateRequestObject()

    const promise = handler.handleRequest(request)

    return promise.should.eventually.have.all.keys('review')
  })
})
