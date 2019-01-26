const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const rootPath = path.join(__dirname, "../");
const outputPath = path.join(rootPath, ".web");

const webpackDllConfig = {
  context: path.join(rootPath, "/src"),

  resolve: {
    extensions: [".js", ".css"]
  },

  entry: {
    vendor: [
      "classnames",
      "query-string",
      "react",
      "react-dom",
      "react-redux",
      "react-router-dom",
      "redux",
      "redux-thunk",
      "whatwg-fetch",
      "history/createBrowserHistory"
    ]
  },

  output: {
    filename: "[name].dll.js",
    path: outputPath,
    library: "[name]"
  },

  module: {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        use: [
          "css-loader"
        ]
      })
    }]
  },

  plugins: [
    new ExtractTextPlugin("[name].dll.css"),
    new webpack.DllPlugin({
      name: "[name]",
      path: path.join(outputPath, "vendor-manifest.json")
    })
  ]
}

module.exports = webpackDllConfig;
