/* eslint-disable no-unused-expressions */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const sinon = require('sinon')

const handler = require('../handler')

const view = require('../view')

const dummyUser = { id: 1 }

const dummyReview = {
  upvotes: [],
  downvotes: [],
  member: {
    id: dummyUser.id,
  },
}

const data = { review: dummyReview }

function generateRequestObject() {
  const request = { auth: {}, params: {} }
  request.auth.credentials = Object.assign({}, dummyUser)
  request.params.id = 1
  request.params.reviewerSlug = 'foo'
  request.log = sinon.spy()
  return request
}

describe('Review Detail View', () => {
  // REVIEW: ownReview and voted checking might be better in handler tests

  it('should render pages/article/review', () => {
    const request = generateRequestObject()
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(data))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        sinon.assert.calledOnce(reply.view)
        sinon.assert.calledWith(reply.view, 'pages/article/review')
      })
  })

  it('should pass review in context', () => {
    const request = generateRequestObject()
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(data))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.should.have.all.keys('review')
        context.review.should.deep.equal(dummyReview)
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
        context.should.have.all.keys('review', 'user')
        context.user.should.have.deep.property('id', dummyUser.id)
      })
  })

  it('should pass user.ownReview if authenticated', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(data))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.should.have.all.keys('review', 'user')
        context.user.ownReview.should.be.a('boolean')
      })
  })

  it('should pass user.ownReview as true if the user owns the review', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const newData = Object.assign({}, data, {
      review: Object.assign({}, data.review, {
        member: {
          id: dummyUser.id,
        },
      }),
    })
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(newData))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.ownReview.should.be.true
      })
  })

  it('should pass user.ownReview as false if the user does not own the review', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const newData = Object.assign({}, data, {
      review: Object.assign({}, data.review, {
        member: {
          id: dummyUser.id + 1,
        },
      }),
    })
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(newData))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.ownReview.should.be.false
      })
  })

  it('should not pass user.upvoted, user.downvoted, and user.voted if user.ownReview', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const newData = Object.assign({}, data, {
      review: Object.assign({}, data.review, {
        member: {
          id: dummyUser.id,
        },
      }),
    })
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(newData))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.ownReview.should.be.true
        context.user.should.not.include.keys('upvoted', 'downvoted', 'voted')
      })
  })

  it('should pass user.upvoted, user.downvoted, and user.voted if not user.ownReview', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const newData = Object.assign({}, data, {
      review: Object.assign({}, data.review, {
        member: {
          id: dummyUser.id + 1,
        },
      }),
    })
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(newData))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.ownReview.should.be.false
        context.user.should.include.keys('upvoted', 'downvoted', 'voted')
        context.user.upvoted.should.be.a('boolean')
        context.user.downvoted.should.be.a('boolean')
        context.user.voted.should.be.a('boolean')
      })
  })

  it('should pass user.upvoted as true if exists upvote with such member id', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const newData = Object.assign({}, data, {
      review: Object.assign({}, data.review, {
        member: {
          id: dummyUser.id + 1,
        },
        upvotes: [{
          member_id: dummyUser.id,
        }],
      }),
    })
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(newData))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.upvoted.should.be.true
        context.user.downvoted.should.be.false
      })
  })

  it('should pass user.downvoted as true if exists downvote with such member id', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const newData = Object.assign({}, data, {
      review: Object.assign({}, data.review, {
        member: {
          id: dummyUser.id + 1,
        },
        downvotes: [{
          member_id: dummyUser.id,
        }],
      }),
    })
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(newData))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.upvoted.should.be.false
        context.user.downvoted.should.be.true
      })
  })

  it('should pass user.voted as true if user.upvoted', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const newData = Object.assign({}, data, {
      review: Object.assign({}, data.review, {
        member: {
          id: dummyUser.id + 1,
        },
        upvotes: [{
          member_id: dummyUser.id,
        }],
      }),
    })
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(newData))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.upvoted.should.be.true
        context.user.voted.should.be.true
      })
  })

  it('should pass user.voted as true if user.downvoted', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const newData = Object.assign({}, data, {
      review: Object.assign({}, data.review, {
        member: {
          id: dummyUser.id + 1,
        },
        downvotes: [{
          member_id: dummyUser.id,
        }],
      }),
    })
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(newData))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.downvoted.should.be.true
        context.user.voted.should.be.true
      })
  })

  it('should pass user.voted as false if not user.upvoted and not user.downvoted', () => {
    const request = generateRequestObject()
    request.auth.isAuthenticated = true
    const newData = Object.assign({}, data, {
      review: Object.assign({}, data.review, {
        member: {
          id: dummyUser.id + 1,
        },
        upvotes: [],
        downvotes: [],
      }),
    })
    const stub = sinon.stub(handler, 'handleRequest').returns(Promise.resolve(newData))
    const reply = { view: sinon.spy() }

    return view(request, reply)
      .then(() => {
        stub.restore()
        const context = reply.view.firstCall.args[1]
        context.user.upvoted.should.be.false
        context.user.downvoted.should.be.false
        context.user.voted.should.be.false
      })
  })
})
