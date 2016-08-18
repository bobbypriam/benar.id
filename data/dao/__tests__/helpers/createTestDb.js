const setup = require('./setup')

console.log('### Creating test database...')
setup.createTestDb()
  .then(() => {
    console.log('### Setting up tables...')
    return setup.initTestTables()
  })
  .then(() => {
    console.log('### Setup done!')
  })
  .catch(err => {
    throw err
  })
