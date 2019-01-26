const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const Dotenv = require('dotenv-webpack');
const rootPath = path.join(__dirname, "../");
const srcPath = path.join(rootPath, "src");
const outputPath = path.join(rootPath, ".web");
const webpackConfig = require("./webpack.config");

webpackConfig.devtool = 'eval-source-map';

webpackConfig.entry = {
  app: [
    "webpack-hot-middleware/client",
    "./main.js"
  ]
};

webpackConfig.output = {
  filename: "[name].js",
  path: path.join(rootPath, ".web"),
  publicPath: "/"
};

const threadLoader = {
  loader: "thread-loader",
  options: {
    workers: require("os").cpus().length - 1
  }
}

const babelLoader = {
  loader: "babel-loader",
  options: {
    cacheDirectory: true
  }
}

webpackConfig.module.rules.push(
  {
    test: /\.js?$/,
    include: srcPath,
    use: [
      babelLoader
    ]
  }, {
    test: /\.(css|scss)$/,
    include: srcPath,
    use: [
      {
        loader: "thread-loader",
        options: {
          workerParallelJobs: 2
        }
      },
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: true,
          importLoaders: 1
        }
      }, {
        loader: "sass-loader",
        options: {
          data: `
            @import '${path.join(srcPath, "static/styles/base")}/variables';
            @import '${path.join(srcPath, "static/styles/base")}/mixin';
          `
        }
      },
    ]
  }, {
    test: /\.svg$/,
    include: srcPath,
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: 'images/icons.svg'
        }
      }
    ]
  }, {
    test: /\.(png|jpe?g|gif|webp)$/,
    include: srcPath,
    use: [
      {
        loader: "url-loader",
        options: {
          name: "images/[name]-[hash].[ext]",
          limit: 2048
        }
      }
    ]
  }, {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "url-loader?limit=10000&minetype=application/font-woff"
  }, {
    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader"
  }
);

webpackConfig.plugins.push(
  new Dotenv({
    path: './.env'
  }),
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("development"),
    },
  }),
  new webpack.DllReferencePlugin({
    context: srcPath,
    manifest: require(path.join(outputPath, "vendor-manifest.json"))
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    async: "commonlazy",
    children: true
  }),
  new SpriteLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: "index.html",
    filename: "index.html",
    title: "Boggle",
    inject: "body",
    minify: false
  }),
  new AddAssetHtmlPlugin({
    includeSourcemap: false,
    filepath: path.join(outputPath, "*.dll.js")
  }),
  new AddAssetHtmlPlugin({
    typeOfAsset: "css",
    includeSourcemap: false,
    filepath: path.join(outputPath, "*.dll.css"),
    extensions: [".js", ".css"]
  })
);

module.exports = webpackConfig;
