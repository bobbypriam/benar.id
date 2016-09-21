/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const getArticle = require('../../../source/server/handlers/getArticle')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyArticle = {
  id: 1,
  reviews: [],
}

const dummyUser = {
  id: 1,
}

it('should call Article.get(id)', () => {
  const request = generateRequestObject()

  request.params.id = 1

  const Article = request.server.app.models.Article = {
    get: Sinon.stub(),
  }
  Article.get.returns(Promise.resolve(dummyArticle))

  const reply = { view: Sinon.spy() }

  return getArticle(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Article.get)
      Sinon.assert.calledWith(Article.get, request.params.id)
    })
})

it('should render pages/article/detail', () => {
  const request = generateRequestObject()

  request.params.id = 1

  const Article = request.server.app.models.Article = {
    get: Sinon.stub(),
  }
  Article.get.returns(Promise.resolve(dummyArticle))

  const reply = { view: Sinon.spy() }

  return getArticle(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.view)
      Sinon.assert.calledWith(reply.view, 'pages/article/detail')
    })
})

it('should pass article in context', () => {
  const request = generateRequestObject()

  request.params.id = 1

  const Article = request.server.app.models.Article = {
    get: Sinon.stub(),
  }
  Article.get.returns(Promise.resolve(dummyArticle))

  const reply = { view: Sinon.spy() }

  return getArticle(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.article.should.deep.equal(dummyArticle)
    })
})

it('should pass user in context if authenticated', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.auth.isAuthenticated = true
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    get: Sinon.stub(),
  }
  Article.get.returns(Promise.resolve(dummyArticle))

  const reply = { view: Sinon.spy() }

  return getArticle(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.should.deep.equal(dummyUser)
    })
})

it('should pass user.reviewed as boolean in context if authenticated', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.auth.isAuthenticated = true
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    get: Sinon.stub(),
  }
  Article.get.returns(Promise.resolve(dummyArticle))

  const reply = { view: Sinon.spy() }

  return getArticle(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.reviewed.should.be.a.boolean
    })
})

it('should pass user.reviewed as true if there exists a review with such user id', () => {
  const request = generateRequestObject()
  const article = Object.assign({}, dummyArticle, {
    reviews: [{
      member: {
        id: dummyUser.id,
      },
    }],
  })

  request.params.id = 1
  request.auth.isAuthenticated = true
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    get: Sinon.stub(),
  }
  Article.get.returns(Promise.resolve(article))

  const reply = { view: Sinon.spy() }

  return getArticle(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.reviewed.should.be.true
    })
})

it('should pass user.reviewed as false if there is no review with such user id', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.auth.isAuthenticated = true
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    get: Sinon.stub(),
  }
  Article.get.returns(Promise.resolve(dummyArticle))

  const reply = { view: Sinon.spy() }

  return getArticle(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.reviewed.should.be.false
    })
})

it('should notify if article is not found', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.auth.isAuthenticated = true
  request.auth.credentials = dummyUser

  const Article = request.server.app.models.Article = {
    get: Sinon.stub(),
  }
  Article.get.returns(Promise.resolve(null))

  const reply = Sinon.spy()

  return getArticle(request, reply)
    .then(() => {
      Sinon.assert.calledWith(reply, 'Not found.')
    })
})
