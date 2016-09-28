const Elm = require('./ReviewList.elm')

const node = document.getElementById('review-list')

Elm.ReviewList.embed(node, window.data)
