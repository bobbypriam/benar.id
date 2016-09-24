/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const postSignUp = require('../../../source/server/handlers/postSignUp')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyUser = {
  id: 1,
  name_slug: 'foo',
}

it('should call Member.create({ name, email })', () => {
  const request = generateRequestObject()

  request.payload = { name: 'Foo', email: 'bar' }
  request.cookieAuth = { set: Sinon.spy() }

  const Member = request.server.app.models.Member = {
    create: Sinon.stub(),
  }
  Member.create.returns(Promise.resolve(dummyUser))

  const reply = { redirect: Sinon.spy() }

  return postSignUp(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Member.create)
      Sinon.assert.calledWith(Member.create, request.payload)
    })
})

it('should call request.cookieAuth.set({ id, slug })', () => {
  const request = generateRequestObject()

  request.payload = { name: 'Foo', email: 'bar' }
  request.cookieAuth = { set: Sinon.spy() }

  const Member = request.server.app.models.Member = {
    create: Sinon.stub(),
  }
  Member.create.returns(Promise.resolve(dummyUser))

  const reply = { redirect: Sinon.spy() }

  return postSignUp(request, reply)
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

  request.payload = { name: 'Foo', email: 'bar' }
  request.cookieAuth = { set: Sinon.spy() }

  const Member = request.server.app.models.Member = {
    create: Sinon.stub(),
  }
  Member.create.returns(Promise.resolve(dummyUser))

  const reply = { redirect: Sinon.spy() }

  return postSignUp(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(reply.redirect, '/')
    })
})

it('should redirect to /masuk if promise is rejected', () => {
  const request = generateRequestObject()

  request.payload = { name: 'Foo', email: 'bar' }
  request.cookieAuth = { set: Sinon.spy() }

  const Member = request.server.app.models.Member = {
    create: Sinon.stub(),
  }
  Member.create.returns(Promise.reject())

  const reply = { redirect: Sinon.spy() }

  return postSignUp(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.redirect)
      Sinon.assert.calledWith(reply.redirect, '/masuk')
    })
})
