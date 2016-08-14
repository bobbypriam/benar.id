const Portal = require('../schema/Portal')

module.exports.create = function create(portalData) {
  return Portal.query().insert(portalData)
}

module.exports.get = function get(slug) {
  return Portal
    .query()
    .where('name_slug', slug)
    .then(portals => portals[0])
}

module.exports.getAll = function getAll() {
  return Portal.query()
}

module.exports.update = function update(id, data) {
  return Portal
    .query()
    .updateAndFetchById(id, data)
}

module.exports.remove = function remove(id) {
  return Portal
    .query()
    .where('id', id)
    .del()
}

// CAUTION: DON'T USE THIS ON APP CODE
// Helper method for clearing database on tests
module.exports.clear = function clear() {
  return Portal.query().del()
}
