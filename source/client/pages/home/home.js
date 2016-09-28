const Elm = require('./ArticleList.elm')

const node = document.getElementById('article-list')

Elm.ArticleList.embed(node, window.data)
