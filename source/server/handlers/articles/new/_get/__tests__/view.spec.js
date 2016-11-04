const chai = require('chai')

chai.should()

const sinon = require('sinon')

const view = require('../view')

function generateRequestObject() {
  const request = { auth: { credentials: { id: 1 } } }
  return request
}

describe('New Article View', () => {
  it('should render pages/article/new', () => {
    const request = generateRequestObject()
    const reply = { view: sinon.spy() }

    view(request, reply)

    sinon.assert.calledOnce(reply.view)
    sinon.assert.calledWith(reply.view, 'pages/article/new')
  })

  it('should pass user to context', () => {
    const request = generateRequestObject()
    const reply = { view: sinon.spy() }

    view(request, reply)

    const context = reply.view.firstCall.args[1]
    context.should.have.all.keys('user')
    context.user.should.deep.equal(request.auth.credentials)
  })
})
