require('../helpers/common').chai.should()

const Sinon = require('sinon')

const generateDefaultRequestObject = require('../helpers/generateDefaultRequestObject')

const getArticle = require('../../../source/server/handlers/getArticle')

function generateRequestObject() {
  const request = generateDefaultRequestObject()
  return request
}

it('should call Article.get(id)', () => {
  const request = generateRequestObject()

  request.params.id = 1

  const Article = request.server.app.models.Article = {
    get: Sinon.stub(),
  }
  Article.get.returns(Promise.resolve({}))

  const reply = { view: Sinon.spy() }

  return getArticle(request, reply)
    .then(() => {
      Sinon.assert.calledOnce(Article.get)
      Sinon.assert.calledWith(Article.get, request.params.id)
    })
})

it('should render pages/article/detail')

it('should pass article in context')

it('should pass user in context if authenticated')

it('should pass user.reviewed as boolean in context if authenticated')

it('should render not found if id nonexistent')
