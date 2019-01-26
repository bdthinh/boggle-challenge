const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const rootPath = path.join(__dirname, "../");
const srcPath = path.join(rootPath, "src");

module.exports = {
  name: "client",
  target: "web",
  context: srcPath,

  resolve: {
    extensions: [".js", ".scss", ".css"],
    symlinks: false,
  },

  module: {
    rules: []
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: "static/TestBoard.txt" },
      { from: "static/dictionary.txt" },
      { from: "static/humans.txt" },
      { from: "static/robots.txt" },
      { from: "static/offline.html" },
      { from: "static/worker.js" },
    ])
  ]
}
