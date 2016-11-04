const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const sinon = require('sinon')

const handler = require('../handler')

const dummyUser = { id: 1, name_slug: 'slug' }

function generateRequestObject() {
  const request = { server: { app: { models: {} } } }
  request.server.app.models.Member = {
    getByEmail: sinon.stub().returns(Promise.resolve(dummyUser)),
  }
  request.cookieAuth = { set: sinon.spy() }
  return request
}

describe('Post Login Handler', () => {
  it('should call Member.getByEmail(email)', () => {
    const request = generateRequestObject()
    request.payload = { email: 'email' }
    const { Member } = request.server.app.models

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(Member.getByEmail)
        sinon.assert.calledWith(Member.getByEmail, request.payload.email)
      })
  })

  it('should call set cookie auth if resolved', () => {
    const request = generateRequestObject()
    request.payload = { email: 'email' }
    const cookieAuth = request.cookieAuth

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(cookieAuth.set)
        sinon.assert.calledWith(cookieAuth.set, { id: dummyUser.id, slug: dummyUser.name_slug })
      })
  })

  it('returned data should contain member', () => {
    const request = generateRequestObject()
    request.payload = { email: 'email' }

    const promise = handler.handleRequest(request)

    return promise.should.eventually.have.all.keys('member')
  })
})
