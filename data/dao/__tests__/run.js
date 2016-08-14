require('dotenv').config()

function importTest(name, path) {
  describe(name, () => {
    require(path) // eslint-disable-line
  })
}

describe('DAO tests', () => {
  importTest('Member', './Member.spec')
})
