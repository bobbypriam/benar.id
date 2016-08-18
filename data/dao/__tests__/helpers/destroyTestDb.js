const setup = require('./setup')

console.log('### Detroying test database...')
setup.destroyTestDb()
  .then(() => {
    console.log('### Destroy done!')
  })
  .catch(err => {
    throw err
  })
