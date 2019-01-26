const webpack = require('webpack');
const historyApiFallback = require('connect-history-api-fallback')
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require('./webpack.dev');
const express = require("express");
const path = require("path");

const app = express();

app.set('port', (process.env.PORT || 3003));

app.use(historyApiFallback());

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: false,
  historyApiFallback: true,
  quite: false,
  watchOptions: {
    aggregateTimeout: 250,
    poll: 500,
    ignored: /node_modules/
  },
  stats: {
    colors: true,
    entrypoints: true,
    assets: false,
    modules: false,
    children: false,
    hash: false
  },
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
  log: false
}));

app.use(express.static(path.join(__dirname, '/src/static')));

app.listen(app.get('port'), function() {
  console.log(`Node app is running on http://localhost:${app.get('port')}`)
})
