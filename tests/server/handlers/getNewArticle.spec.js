/* eslint-disable no-unused-expressions */

require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const getNewArticle = require('../../../source/server/handlers/getNewArticle')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

const dummyUser = {
  id: 1,
}

it('should render pages/article/new', () => {
  const request = generateRequestObject()

  request.auth.credentials = dummyUser

  const reply = { view: Sinon.spy() }

  getNewArticle(request, reply)

  Sinon.assert.calledOnce(reply.view)
  Sinon.assert.calledWith(reply.view, 'pages/article/new')
})

it('should pass user to context', () => {
  const request = generateRequestObject()

  request.auth.credentials = dummyUser

  const reply = { view: Sinon.spy() }

  getNewArticle(request, reply)

  const context = reply.view.firstCall.args[1]
  context.user.should.deep.equal(dummyUser)
})
