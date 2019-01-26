const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackConditionAsset = require("html-webpack-condition-assets");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const InlineChunkWebpackPlugin = require("html-webpack-inline-chunk-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const rootPath = path.join(__dirname, "../");
const srcPath = path.join(rootPath, "src");
const webpackConfig = require("./webpack.config");

webpackConfig.devtool = false;

webpackConfig.stats = {
  children: false
};

webpackConfig.entry = {
  app: [
    "./main.js"
  ],
  vendor: [
    "classnames",
    "query-string",
    "react",
    "react-dom",
    "react-redux",
    "redux",
    "redux-thunk",
    "whatwg-fetch",
    "history/createBrowserHistory"
  ],
  polyfills: [
    "@babel/polyfill"
  ],
};

webpackConfig.output = {
  filename: "[name]-[chunkhash].js",
  path: path.join(rootPath, "build"),
  chunkFilename: "[name]-[chunkhash].chunk.js",
  publicPath: "/"
};

webpackConfig.performance = {
  maxAssetSize: 400000,
  maxEntrypointSize: 1000000,
  hints: "warning"
};

const threadLoader = {
  loader: "thread-loader",
  options: {
    workers: require("os").cpus().length - 1
  }
};
const babelLoader = {
  loader: "babel-loader",
  options: {
    babelrc: false,
    compact: true,
    passPerPreset: true,
    presets: [
      [
        "@babel/env",
        {
          targets: {
            browsers: ["last 2 major versions", "> 5%", "safari > 8", "not ie < 11"]
          },
          modules: false,
        }
      ],
      "@babel/react",
      "@babel/stage-2"
    ],
    plugins: [
      "lodash",
      "@babel/proposal-class-properties",
      "@babel/plugin-transform-react-inline-elements",
      "@babel/plugin-transform-react-constant-elements",
      [
        "transform-react-remove-prop-types",
        {
          mode: "remove",
          removeImport: true
        }
      ],
      [
        "@babel/transform-runtime",
        {
          helpers: true,
          polyfill: true,
          regenerator: true,
          useESModules: true,
          moduleName: "@babel/runtime"
        }
      ]
    ]
  }
};

webpackConfig.module.rules.push(
  {
    test: /\.jsx?$/,
    include: [
      srcPath,
      /node_modules\/whatwg-fetch/,
    ],
    use: [
      "cache-loader",
      threadLoader,
      babelLoader
    ]
  }, {
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
        "cache-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 2
          }
        }, {
          loader: "sass-loader",
        },
      ]
    })
  }, {
    test: /\.svg$/,
    include: srcPath,
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: "images/icons.svg",
        }
      },
      {
        loader: "svgo-loader",
        options: {
          plugins: [
            { cleanupAttrs: true },
            { removeDoctype: true },
            { removeComments: true },
            { removeMetadata: true },
            { removeUselessDefs: true },
            { removeHiddenElems: true },
            { minifyStyles: true },
            { removeTitle: true },
            { convertColors: { shorthex: true } },
            { convertPathData: true }
          ]
        }
      },
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
    path: './.prod.env'
  }),
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("production"),
    },
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /date-fns/),
  new webpack.optimize.CommonsChunkPlugin({
    names: ["vendor", "manifest"],
    minChunks: Infinity
  }),
  new webpack.optimize.CommonsChunkPlugin({
    async: "commonlazy",
    children: true
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    warning: false,
    compress:{
      warnings: false
    },
    minimize: true,
    output: {
      comments: false,
     },
     exclude: [/\.min\.js$/gi] // skip pre-minified libs
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new ExtractTextPlugin("[name]-[contenthash].css"),
  new OptimizeCssAssetsPlugin(),
  new SpriteLoaderPlugin(),
  new PreloadWebpackPlugin({
    rel: "preload",
    as: "script",
    include: ["vendor", "app"],
    fileBlacklist: [/\.map\./, /\.css$/]
  }),
  new InlineChunkWebpackPlugin({
    inlineChunks: ["manifest"]
  }),
  new HtmlWebpackConditionAsset({
    assets: [{
      chunkName: "polyfills",
      condition: `!("Promise" in window && "Map" in window && "Set" in window && "assign" in Object)`
    }]
  }),
  new HtmlWebpackPlugin({
    template: "index.html",
    filename: "index.html",
    title: "Boggle",
    inject: "body",
    minify: {
      html5: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: false,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributese: true,
      useShortDoctype: true
    }
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: "static"
  }),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.html$|\.css$|\.eot?.+$|\.ttf?.+$|\.woff?$|\.svg?.+$/,
  })
);

module.exports = webpackConfig;
