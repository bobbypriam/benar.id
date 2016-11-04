const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const sinon = require('sinon')

const handler = require('../handler')

const dummyUser = { id: 1, name_slug: 'slug' }

const voteMethod = 'vote'

function generateRequestObject() {
  const request = { server: { app: { models: {} } } }
  request.server.app.models.Review = {
    [voteMethod]: sinon.stub().returns(Promise.resolve()),
  }
  request.payload = { reviewId: 1 }
  request.params = { id: 1, reviewerSlug: 'foo' }
  request.auth = { credentials: dummyUser }
  return request
}

describe('Post Review Vote Handler', () => {
  it('should call Review[voteMethod](reviewId, memberId)', () => {
    const request = generateRequestObject()
    const { Review } = request.server.app.models

    return handler.handleRequest(voteMethod)(request)
      .then(() => {
        sinon.assert.calledOnce(Review[voteMethod])
        sinon.assert.calledWith(
          Review[voteMethod],
          request.payload.reviewId,
          request.auth.credentials.id
        )
      })
  })
})
