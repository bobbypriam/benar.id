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
    create: sinon.stub().returns(Promise.resolve(dummyUser)),
  }
  request.cookieAuth = { set: sinon.spy() }
  request.payload = { name: 'name', email: 'email' }
  return request
}

describe('Post Signup Handler', () => {
  it('should call Member.create(memberData)', () => {
    const request = generateRequestObject()
    const { Member } = request.server.app.models

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(Member.create)
        sinon.assert.calledWith(Member.create, request.payload)
      })
  })

  it('should call set cookie auth if resolved', () => {
    const request = generateRequestObject()
    const cookieAuth = request.cookieAuth

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(cookieAuth.set)
        sinon.assert.calledWith(cookieAuth.set, { id: dummyUser.id, slug: dummyUser.name_slug })
      })
  })

  it('returned data should contain member', () => {
    const request = generateRequestObject()

    const promise = handler.handleRequest(request)

    return promise.should.eventually.have.all.keys('member')
  })
})
