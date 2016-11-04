const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const sinon = require('sinon')

const handler = require('../handler')

const dummyUser = { id: 1, name_slug: 'slug' }
const dummyReview = { id: 1 }

function generateRequestObject() {
  const request = { server: { app: { models: {} } } }
  request.server.app.models.Article = {
    writeReview: sinon.stub().returns(Promise.resolve(dummyReview)),
  }
  request.payload = Object.assign({}, dummyReview)
  request.params = { id: 1 }
  request.auth = { credentials: dummyUser }
  return request
}

describe('Post Review Handler', () => {
  it('should call Article.writeReview(articleId, review)', () => {
    const request = generateRequestObject()
    const { Article } = request.server.app.models

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(Article.writeReview)
        sinon.assert.calledWith(
          Article.writeReview,
          request.params.id,
          Object.assign({}, request.payload, {
            member_id: request.auth.credentials.id,
          })
        )
      })
  })

  it('returned data should contain created review', () => {
    const request = generateRequestObject()

    const promise = handler.handleRequest(request)

    return promise.should.eventually.have.all.keys('review')
  })
})
