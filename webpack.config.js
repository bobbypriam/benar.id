const path = require('path')
const glob = require('glob')

const AssetsPlugin = require('assets-webpack-plugin')

const entryFilePaths = glob.sync('./source/client/pages/**/*.js')

const entryFiles = {}

entryFilePaths.forEach(filePath => {
  const name = path.basename(filePath).split('.')[0]
  entryFiles[name] = filePath
})

module.exports = {
  entry: entryFiles,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.elm'],
  },

  module: {
    noParse: /\.elm$/,
    loaders: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'elm-webpack?verbose=true&warn=true',
      },
    ],
  },

  plugins: [
    new AssetsPlugin(),
  ],
}
