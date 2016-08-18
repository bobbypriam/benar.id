require('./helpers/common').chai.should()

const Portal = require('../Portal')
const Member = require('../Member')
const Article = require('../Article')
const Review = require('../Review')
const portals = require('./fixtures/portals')
const members = require('./fixtures/members')
const articles = require('./fixtures/articles')
const reviews = require('./fixtures/reviews')

let articleId
let memberId

before(() =>
  Promise.all([
    Portal.create(portals.valid[0]),
    Member.create(members.valid[0]),
  ]).then(result => {
    memberId = result[1].id
    return Article.create(Object.assign({}, articles.valid[0], {
      portal_id: result[0].id,
      member_id: result[1].id,
    }))
  }).then(createdArticle => {
    articleId = createdArticle.id
  })
)

afterEach(() => Review.clear())

after(() =>
  Article.clear()
    .then(() => Promise.all([
      Portal.clear(),
      Member.clear(),
    ])
))
