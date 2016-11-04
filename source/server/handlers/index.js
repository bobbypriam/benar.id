const requireDirectory = require('require-directory')

module.exports = requireDirectory(module, {
  include: /(view|api)\.js/,
})
