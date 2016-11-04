/* eslint-disable no-unused-expressions */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const sinon = require('sinon')

const handler = require('../handler')

const view = require('../view')

const dummyUser = { id: 1 }

const dummyArticle = { id: 1, reviews: [] }

const data = { article: dummyArticle }

function generateRequestObject() {
  const request = { auth: {} }
  request.auth.credentials = Object.assign({}, dummyUser)
  request.params = { id: dummyArticle.id }
  request.log = sinon.spy()
  return request
}

describe('Article Detail View', () => {
  it('should render pages/article/detail', () => {
    const request = generateRequestObject()
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(data))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        sinon.assert.calledOnce(reply.view)
        sinon.assert.calledWith(reply.view, 'pages/article/detail')
      })
  })

  it('should pass article in context', () => {
    const request = generateRequestObject()
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(data))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.should.have.all.keys('article')
        context.article.should.deep.equal(dummyArticle)
      })
  })

  it('should pass user in context if authenticated', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(data))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.should.have.all.keys('article', 'user')
        context.user.should.have.deep.property('id', dummyUser.id)
      })
  })

  it('should pass user.reviewed as boolean in context if authenticated', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(data))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.should.have.all.keys('article', 'user')
        context.user.reviewed.should.be.a('boolean')
      })
  })

  it('should pass user.reviewed as false if there is no review with such user id', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(data))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.reviewed.should.be.false
      })
  })

  it('should pass user.reviewed as true if there exists a review with such user id', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const newData = Object.assign({}, data, {
      article: Object.assign({}, data.article, {
        reviews: [{ member: { id: dummyUser.id } }],
      }),
    })
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(newData))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.reviewed.should.be.true
      })
  })
})
