require('dotenv').config()

function importTest(name, path) {
  describe(name, () => {
    require(path) // eslint-disable-line
  })
}

describe('DAO tests', () => {
  importTest('Member', './Member.spec')
  importTest('Portal', './Portal.spec')
  importTest('Article', './Article.spec')
  importTest('Review', './Review.spec')
})
