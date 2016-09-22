/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const getReview = require('../../../source/server/handlers/getReview')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyReview = {
  upvotes: [],
  downvotes: [],
  member: {
    id: 10,
  },
}

const dummyUser = {
  id: 1,
}

it('should call Article.getReview(articleId, reviewerSlug)', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(dummyReview))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Article.getReview)
      Sinon.assert.calledWith(
        Article.getReview,
        request.params.id,
        request.params.reviewerSlug
      )
    })
})

it('should render pages/article/review', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(dummyReview))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(reply.view)
      Sinon.assert.calledWith(reply.view, 'pages/article/review')
    })
})

it('should pass review in context', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(dummyReview))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.review.should.deep.equal(dummyReview)
    })
})

it('should pass user in context if authenticated', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.auth.isAuthenticated = true
  request.auth.credentials = Object.assign({}, dummyUser)

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(dummyReview))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.should.deep.equal(request.auth.credentials)
    })
})

it('should pass user.ownReview if authenticated', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.auth.isAuthenticated = true
  request.auth.credentials = Object.assign({}, dummyUser)

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(dummyReview))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.ownReview.should.be.a.boolean
    })
})

it('should pass user.ownReview as true if the user owns the review', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.auth.isAuthenticated = true
  request.auth.credentials = Object.assign({}, dummyUser)

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(Object.assign({}, dummyReview, {
    member: {
      id: dummyUser.id,
    },
  })))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.ownReview.should.be.true
    })
})

it('should pass user.ownReview as false if the user does not own the review', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.auth.isAuthenticated = true
  request.auth.credentials = Object.assign({}, dummyUser)

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(Object.assign({}, dummyReview, {
    member: {
      id: dummyUser.id + 1,
    },
  })))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.ownReview.should.be.false
    })
})

it('should pass user.upvoted, user.downvoted, and user.voted if not user.ownReview', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.auth.isAuthenticated = true
  request.auth.credentials = Object.assign({}, dummyUser)

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(Object.assign({}, dummyReview, {
    member: {
      id: dummyUser.id + 1,
    },
  })))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.upvoted.should.exist
      context.user.downvoted.should.exist
      context.user.voted.should.exist
    })
})

it('should not pass user.upvoted, user.downvoted, and user.voted if user.ownReview', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.auth.isAuthenticated = true
  request.auth.credentials = Object.assign({}, dummyUser)

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(Object.assign({}, dummyReview, {
    member: {
      id: dummyUser.id,
    },
  })))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      ;(typeof context.user.upvoted).should.equal('undefined')
      ;(typeof context.user.downvoted).should.equal('undefined')
      ;(typeof context.user.voted).should.equal('undefined')
    })
})

it('should pass user.upvoted as true if exists upvote with such member id', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.auth.isAuthenticated = true
  request.auth.credentials = Object.assign({}, dummyUser)

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(Object.assign({}, dummyReview, {
    upvotes: [{
      member_id: dummyUser.id,
    }],
    downvotes: [],
  })))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.upvoted.should.be.true
    })
})

it('should pass user.downvoted as true if exists downvote with such member id', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.auth.isAuthenticated = true
  request.auth.credentials = Object.assign({}, dummyUser)

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(Object.assign({}, dummyReview, {
    upvotes: [],
    downvotes: [{
      member_id: dummyUser.id,
    }],
  })))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.downvoted.should.be.true
    })
})

it('should pass user.voted as true if user.upvoted', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.auth.isAuthenticated = true
  request.auth.credentials = Object.assign({}, dummyUser)

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(Object.assign({}, dummyReview, {
    upvotes: [{
      member_id: dummyUser.id,
    }],
    downvotes: [],
  })))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.voted.should.be.true
    })
})

it('should pass user.voted as true if user.downvoted', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.auth.isAuthenticated = true
  request.auth.credentials = Object.assign({}, dummyUser)

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(Object.assign({}, dummyReview, {
    upvotes: [],
    downvotes: [{
      member_id: dummyUser.id,
    }],
  })))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.voted.should.be.true
    })
})

it('should pass user.voted as false if not user.upvoted and not user.downvoted', () => {
  const request = generateRequestObject()

  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.auth.isAuthenticated = true
  request.auth.credentials = Object.assign({}, dummyUser)

  const Article = request.server.app.models.Article = {
    getReview: Sinon.stub(),
  }
  Article.getReview.returns(Promise.resolve(Object.assign({}, dummyReview, {
    upvotes: [],
    downvotes: [],
  })))

  const reply = { view: Sinon.spy() }

  return getReview(request, reply)
    .then(() => {
      const context = reply.view.firstCall.args[1]
      context.user.voted.should.be.false
    })
})
