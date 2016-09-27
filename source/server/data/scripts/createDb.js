const setup = require('./setup')

console.log('[Migration Script] Creating database...')

function run() {
  setup.createDb()
    .then(() => {
      console.log('[Migration Script] Setting up tables...')
      return setup.initTables()
    })
    .then(() => {
      console.log('[Migration Script] Database setup done!')
    })
    .catch(err => {
      console.error('[Migration Script] Setup error! Message:', err.message)
      process.exit(1)
    })
}

run()
