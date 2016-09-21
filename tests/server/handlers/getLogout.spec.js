/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const getLogout = require('../../../source/server/handlers/getLogout')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

it('should redirect to home', () => {
  const request = generateRequestObject()

  const reply = { redirect: Sinon.spy() }

  getLogout(request, reply)

  Sinon.assert.calledOnce(reply.redirect)
  Sinon.assert.calledWith(reply.redirect, '/')
})

it('should clear cookie auth if authenticated', () => {
  const request = generateRequestObject()

  request.auth.isAuthenticated = true
  request.cookieAuth = {
    clear: Sinon.spy(),
  }

  const reply = { redirect: Sinon.spy() }

  getLogout(request, reply)

  Sinon.assert.calledOnce(request.cookieAuth.clear)
})
