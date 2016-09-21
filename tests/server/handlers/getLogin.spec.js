/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const getLogin = require('../../../source/server/handlers/getLogin')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

it('should render pages/login if not logged in', () => {
  const request = generateRequestObject()

  const reply = { view: Sinon.spy() }

  getLogin(request, reply)

  Sinon.assert.calledOnce(reply.view)
  Sinon.assert.calledWith(reply.view, 'pages/login')
})

it('should redirect to home if logged in', () => {
  const request = generateRequestObject()

  request.auth.isAuthenticated = true

  const reply = { redirect: Sinon.spy() }

  getLogin(request, reply)

  Sinon.assert.calledOnce(reply.redirect)
  Sinon.assert.calledWith(reply.redirect, '/')
})
