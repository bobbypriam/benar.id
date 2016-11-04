const chai = require('chai')

chai.should()

const sinon = require('sinon')

const handler = require('../handler')

const view = require('../view')

function generateRequestObject() {
  const request = {}
  return request
}

describe('Logout View', () => {
  it('should redirect to home', () => {
    const request = generateRequestObject()
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve())
    const reply = { redirect: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        sinon.assert.calledOnce(reply.redirect)
        sinon.assert.calledWith(reply.redirect, '/')
      })
  })
})
