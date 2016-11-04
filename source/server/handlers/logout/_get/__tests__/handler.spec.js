const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const sinon = require('sinon')

const handler = require('../handler')

function generateRequestObject() {
  const request = { auth: {} }
  request.cookieAuth = { clear: sinon.spy() }
  return request
}

describe('Logout Handler', () => {
  it('should resolve if not authenticated', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = false

    const promise = handler.handleRequest(request)

    return promise.should.be.fulfilled
  })

  it('should resolve if authenticated', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true

    const promise = handler.handleRequest(request)

    return promise.should.be.fulfilled
  })

  it('should clear cookieAuth if authenticated', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const cookieAuth = request.cookieAuth

    return handler.handleRequest(request)
      .then(() => {
        sinon.assert.calledOnce(cookieAuth.clear)
      })
  })
})
