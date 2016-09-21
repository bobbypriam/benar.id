require('dotenv').config()

function importTest(name, path) {
  describe(name, () => {
    require(path) // eslint-disable-line
  })
}

describe('Handler tests', () => {
  importTest('getHome', './getHome.spec')
  importTest('getArticle', './getArticle.spec')
  importTest('getLogin', './getLogin.spec')
})
