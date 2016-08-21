const Elm = require('./ArticleDetail.elm')

/* global data */
const article = window.data.article || {}

const node = document.getElementById('article-detail')
const app = Elm.ArticleDetail.embed(node)

app.ports.article.send(article)
