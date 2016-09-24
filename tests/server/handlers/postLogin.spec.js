/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const postLogin = require('../../../source/server/handlers/postLogin')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyUser = {
  id: 1,
  name_slug: 'foo',
}

it('should call Member.getByEmail(email)', () => {
  const request = generateRequestObject()

  request.payload = { email: 'foo' }
  request.cookieAuth = { set: Sinon.spy() }

  const Member = request.server.app.models.Member = {
    getByEmail: Sinon.stub(),
  }
  Member.getByEmail.returns(Promise.resolve(dummyUser))

  const reply = { redirect: Sinon.spy() }

  return postLogin(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Member.getByEmail)
      Sinon.assert.calledWith(Member.getByEmail, request.payload.email)
    })
})

it('should call request.cookieAuth.set({ id, slug })', () => {
  const request = generateRequestObject()

  request.payload = { email: 'foo' }
  request.cookieAuth = { set: Sinon.spy() }

  const Member = request.server.app.models.Member = {
    getByEmail: Sinon.stub(),
  }
  Member.getByEmail.returns(Promise.resolve(dummyUser))

  const reply = { redirect: Sinon.spy() }

  return postLogin(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(request.cookieAuth.set)
      Sinon.assert.calledWith(request.cookieAuth.set, {
        id: dummyUser.id,
        slug: dummyUser.name_slug,
      })
    })
})

it('should redirect to home if success', () => {
  const request = generateRequestObject()

  request.payload = { email: 'foo' }
  request.cookieAuth = { set: Sinon.spy() }

  const Member = request.server.app.models.Member = {
    getByEmail: Sinon.stub(),
  }
  Member.getByEmail.returns(Promise.resolve(dummyUser))

  const reply = { redirect: Sinon.spy() }

  return postLogin(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(reply.redirect, '/')
    })
})

it('should redirect to /masuk if promise is rejected', () => {
  const request = generateRequestObject()

  request.payload = { email: 'foo' }
  request.cookieAuth = { set: Sinon.spy() }

  const Member = request.server.app.models.Member = {
    getByEmail: Sinon.stub(),
  }
  Member.getByEmail.returns(Promise.reject())

  const reply = { redirect: Sinon.spy() }

  return postLogin(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(reply.redirect, '/masuk')
    })
})
