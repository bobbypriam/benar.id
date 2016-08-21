const Elm = require('./Home.elm')

/* global data */
const articles = window.data.articles || []

const node = document.getElementById('home')
const app = Elm.Home.embed(node)

app.ports.articles.send(articles)
