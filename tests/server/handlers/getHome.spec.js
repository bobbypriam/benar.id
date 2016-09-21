require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const getHome = require('../../../source/server/handlers/getHome')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  request.server.app.assets = { home: { js: '' } }
  return request
}

it('should call Article.getAll()', () => {
  const request = generateRequestObject()

  const Article = request.server.app.models.Article = {
    getAll: Sinon.stub(),
  }
  Article.getAll.returns(Promise.resolve([]))

  const reply = { view: Sinon.spy() }

  return getHome(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Article.getAll)
    })
})

it('should render pages/home', () => {
  const request = generateRequestObject()

  const Article = request.server.app.models.Article = {
    getAll: Sinon.stub(),
  }
  Article.getAll.returns(Promise.resolve([]))

  const reply = { view: Sinon.spy() }

  return getHome(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.view)
      Sinon.assert.calledWith(reply.view, 'pages/home')
    })
})

it('should pass articles in context', () => {
  const request = generateRequestObject()
  const dummyArticles = [{ foo: 'bar' }]

  const Article = request.server.app.models.Article = {
    getAll: Sinon.stub(),
  }
  Article.getAll.returns(Promise.resolve(dummyArticles))

  const reply = { view: Sinon.spy() }

  return getHome(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.articles.should.deep.equal(dummyArticles)
    })
})

it('should pass user in context if authenticated', () => {
  const request = generateRequestObject()
  const dummyUser = { foo: 'bar' }

  request.auth.isAuthenticated = true
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    getAll: Sinon.stub(),
  }
  Article.getAll.returns(Promise.resolve([]))

  const reply = { view: Sinon.spy() }

  return getHome(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.should.deep.equal(dummyUser)
    })
})
