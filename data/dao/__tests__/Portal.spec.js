require('./helpers/common').chai.should()

const Portal = require('../Portal')
const portals = require('./fixtures/portals')

describe('#create()', () => {
  it('should create a new portal if called with valid data', () => {
    const portalData = portals.valid[0]
    const promise = Portal.create(portalData)
    return promise.should.be.fulfilled
  })
  it('should reject if no name is provided', () => {
    const portalData = portals.invalid.noName
    const promise = Portal.create(portalData)
    return promise.should.be.rejected
  })
  it('should reject if no slug is provided', () => {
    const portalData = portals.invalid.noSlug
    const promise = Portal.create(portalData)
    return promise.should.be.rejected
  })
  it('should reject if no site url is provided', () => {
    const portalData = portals.invalid.noSiteUrl
    const promise = Portal.create(portalData)
    return promise.should.be.rejected
  })
})

describe('#get()', () => {
  before(() => Portal.create(portals.valid[0]))

  it('should return the portal with the provided slug', () => {
    const slug = portals.valid[0].name_slug
    const promise = Portal.get(slug)
    return promise.should.eventually.deep.property('name', portals.valid[0].name)
  })
})

describe('#getAll()', () => {
  before(() => {
    const promises = portals.valid.map(portal => Portal.create(portal))
    return Promise.all(promises)
  })

  it('should return all portals', () => {
    const promise = Portal.getAll()
    return promise.should.eventually.have.length(portals.valid.length)
  })
})

describe('#update()', () => {
  let portalId

  before(() => Portal
    .create(portals.valid[0])
    .then(createdPortal => {
      portalId = createdPortal.id
    }))

  it('should update portal with the new data', () => {
    const newData = {
      name: 'New Detik.com',
    }
    const promise = Portal.update(portalId, newData)
    return promise.should.eventually.deep.property('name', newData.name)
  })
})

describe('#delete()', () => {
  let portalId

  before(() => Portal
    .create(portals.valid[0])
    .then(createdPortal => {
      portalId = createdPortal.id
    }))

  it('should delete portal with given portalId', () => {
    const promise = Portal.remove(portalId)
    return promise.should.eventually.equal(1)
  })
})

afterEach(() => Portal.clear())
