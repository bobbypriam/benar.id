const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const sinon = require('sinon')

const handler = require('../handler')

const dummyUser = { id: 1, name_slug: 'slug' }
const dummyFeedback = { id: 1 }

function generateRequestObject() {
  const request = { server: { app: { models: {} } } }
  request.server.app.models.Feedback = {
    writeReply: sinon.stub().returns(Promise.resolve(dummyFeedback)),
  }
  request.payload = Object.assign({}, dummyFeedback)
  request.params = { parentFeedbackId: 1 }
  request.auth = { credentials: dummyUser }
  return request
}

describe('Post Feedback Reply Handler', () => {
  it('should call Feedback.writeReply(parentFeedbackId, review)', () => {
    const request = generateRequestObject()
    const { Feedback } = request.server.app.models

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(Feedback.writeReply)
        sinon.assert.calledWith(
          Feedback.writeReply,
          request.params.parentFeedbackId,
          Object.assign({}, request.payload, {
            member_id: request.auth.credentials.id,
          })
        )
      })
  })

  it('returned data should contain created feedback', () => {
    const request = generateRequestObject()

    const promise = handler.handleRequest(request)

    return promise.should.eventually.have.all.keys('feedback')
  })
})
