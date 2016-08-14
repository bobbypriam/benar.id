module.exports = {
  valid: [{
    name: 'Detik.com',
    slug: 'Detik-com',
    site_url: 'http://www.detik.com',
  }, {
    name: 'Kompas.com',
    slug: 'Kompas-com',
    site_url: 'http://www.kompas.com',
  }],
  invalid: {
    noName: {
      slug: 'Detik-com',
      site_url: 'http://www.detik.com',
    },
    noSlug: {
      name: 'Detik.com',
      site_url: 'http://www.detik.com',
    },
    noSiteUrl: {
      name: 'Detik.com',
      slug: 'Detik-com',
    },
  },
}
