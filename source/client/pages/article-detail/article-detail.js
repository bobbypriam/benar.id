const Elm = require('./ArticleDetail.elm')

const node = document.getElementById('elm-root')

Elm.ArticleDetail.embed(node, window.data)
