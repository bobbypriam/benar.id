module.exports = {
  valid: [{
    email: 'john@email.com',
    name: 'John Smith',
    name_slug: 'John-Smith',
  }, {
    email: 'jane@email.com',
    name: 'Jane Smith',
    name_slug: 'Jane-Smith',
  }, {
    email: 'joe@email.com',
    name: 'Joe Smith',
    name_slug: 'Joe-Smith',
  }],
  invalid: {
    noEmail: {
      name: 'John Smith',
      name_slug: 'John-Smith',
    },
    noName: {
      email: 'john@email.com',
      name_slug: 'John-Smith',
    },
    noNameSlug: {
      email: 'john@email.com',
      name: 'John Smith',
    },
  },
}
