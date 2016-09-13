module.exports = {
  valid: [{
    email: 'john@email.com',
    name: 'John Smith',
  }, {
    email: 'jane@email.com',
    name: 'Jane Smith',
  }, {
    email: 'joe@email.com',
    name: 'Joe Smith',
  }],
  invalid: {
    noEmail: {
      name: 'John Smith',
    },
    noName: {
      email: 'john@email.com',
    },
  },
}
