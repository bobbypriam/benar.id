require('dotenv').config()

function importTest(name, path) {
  describe(name, () => {
    require(path) // eslint-disable-line
  })
}

describe('Handler tests', () => {
  // Import tests here
})
