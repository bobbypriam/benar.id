const setup = require('./setup')

if (process.env.NODE_ENV === 'production') {
  console.error('[ERROR] Cannot destroy database in production.')
  process.exit(1)
}

console.log('[Database Teardown Script] Detroying database...')
setup.destroyDb()
  .then(() => {
    console.log('[Database Teardown Script] Destroy done!')
  })
  .catch(err => {
    throw err
  })
