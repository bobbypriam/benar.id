const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const Sinon = require('sinon')

const handler = require('../handler')

const view = require('../view')

function generateRequestObject() {
  const request = { auth: {} }
  request.log = Sinon.spy()
  return request
}

describe('Home View', () => {
  it('should call render pages/home on resolve', () => {
    const request = generateRequestObject()
    const stub = Sinon.stub(handler, 'handleRequest').returns(Promise.resolve([]))

    const reply = { view: Sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        Sinon.assert.calledOnce(reply.view)
        Sinon.assert.calledWith(reply.view, 'pages/home')
      })
  })

  it('should pass articles to context', () => {
    const request = generateRequestObject()
    const data = { articles: [{ id: 1, title: 'Title' }] }
    const stub = Sinon.stub(handler, 'handleRequest').returns(Promise.resolve(data))
    const reply = { view: Sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.should.have.all.keys('articles')
        context.articles.should.deep.equal(data.articles)
      })
  })

  it('should pass user in context if authenticated', () => {
    const request = generateRequestObject()
    const dummyUser = { id: 1, name: 'Name' }
    request.auth.isAuthenticated = true
    request.auth.credentials = dummyUser
    const stub = Sinon.stub(handler, 'handleRequest').returns(Promise.resolve([]))
    const reply = { view: Sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.should.deep.equal(dummyUser)
      })
  })
})
