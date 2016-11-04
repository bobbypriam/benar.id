const chai = require('chai')

chai.should()

const sinon = require('sinon')

const view = require('../view')

function generateRequestObject() {
  const request = { auth: {} }
  return request
}

describe('Login View', () => {
  it('should call render pages/login if not authenticated', () => {
    const request = generateRequestObject()
    const reply = { view: sinon.spy() }

    view(request, reply)

    sinon.assert.calledOnce(reply.view)
    sinon.assert.calledWith(reply.view, 'pages/login')
  })

  it('should redirect to home if authenticated', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const reply = { redirect: sinon.spy() }

    view(request, reply)

    sinon.assert.calledOnce(reply.redirect)
    sinon.assert.calledWith(reply.redirect, '/')
  })
})
