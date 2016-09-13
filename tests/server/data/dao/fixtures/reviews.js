module.exports = {
  valid: [{
    content: '<p>This is a first review</p>',
    rating: 8,
  }, {
    content: '<p>This is a second review</p>',
    rating: 10,
  }],
  invalid: {
    noContent: {
      rating: 8,
    },
    noRating: {
      content: '<p>Invalid</p>',
    },
  },
}
