module.exports = {
  valid: [{
    title: 'First Article',
    url: 'http://news.detik.com/1',
  }, {
    title: 'Second Article',
    url: 'http://news.detik.com/1',
  }],
  invalid: {
    noTitle: {
      url: 'http://news.detik.com/1',
    },
    noUrl: {
      title: 'First Article',
    },
  },
}
