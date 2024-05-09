'use strict';

require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('../../package.json');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// Directories
const ROOT_DIR = path.resolve(__dirname, '../..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const SRC_DIR = resolvePath('src');
const BUILD_DIR = resolvePath('build');

// Enviroment Verification
const isProduction = process.argv.includes('--env.production');

// File names and extensions
const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const reFont = /\.(eot|otf|ttf|woff|woff2)$/;
const staticAssetName = '[name].[ext]';

const config = {
  context: ROOT_DIR,

  name: 'client',

  target: 'web',

  mode: isProduction ? 'production' : 'development',

  entry: {
    client: ['babel-polyfill', resolvePath(SRC_DIR, 'client/app.js')]
  },

  resolve: {
    modules: ['node_modules', 'src']
  },

  output: {
    path: resolvePath(BUILD_DIR, 'static'),
    publicPath: '/static/',
    filename: !isProduction ?
      'js/[name].js' :
      'js/[name].[hash:8].js',
    chunkFilename: !isProduction ?
      'js/[name].js' :
      'js/[name].[hash:8].js'
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    // Minimize all JavaScript output of chunks
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: isProduction,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ],
  },

  plugins: [
    // Extract all CSS files and compile it on a single file
    new ExtractTextPlugin({
      filename: !isProduction ?
        'css/[name].css' :
        'css/[name].[contenthash:base64:8].css',
      publicPath: '/static/',
      allChunks: true
    }),

    // Define free variables
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': !isProduction ? '"development"' : '"production"',
      'process.env.BROWSER': true
    }),

    // Emit a file with assets paths
    new AssetsPlugin({
      path: BUILD_DIR,
      filename: 'assets.json',
      prettyPrint: true
    }),

    ...(isProduction ?
      [
        // Decrease script evaluation time
        new webpack.optimize.ModuleConcatenationPlugin(),

        // SW-Precache for offline-working
        new SWPrecacheWebpackPlugin({
          cacheId: 'axion-card-pwa',
          minify: isProduction,
          filename: '../sw.js',
          staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
          directoryIndex: '/',
          navigateFallback: '/',
          maximumFileSizeToCacheInBytes: !isProduction ? 5242880 : 2097152,
          verbose: !isProduction,
          runtimeCaching: [{
              // Use a 'cache-first' strategy for js or css bundles and images.
              urlPattern: /\/static\//,
              handler: 'cacheFirst'
            },
            {
              // Use a 'network-first' strategy for API request to get fresh data.
              urlPattern: /\/api\//,
              handler: 'networkFirst',
              options: {
                cache: {
                  name: 'api-cache'
                },
                debug: !isProduction,
                successResponses: /^0|([123]\d\d)|(40[134567])|410$/
              }
            },
            {
              // Use a network-first strategy for everything else.
              default: 'networkFirst'
            }
          ]
        }),

      ] :
      [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin()
      ]
    )
  ],
  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,

    rules: [
      // Rules for JS / JSX
      {
        test: reScript,
        include: [
          SRC_DIR,
          resolvePath('tools')
        ],
        loader: 'babel-loader',
        options: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: isProduction,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            // A Babel preset that can automatically determine the Babel plugins and polyfills
            // https://github.com/babel/babel-preset-env
            [
              'env',
              {
                targets: {
                  browsers: pkg.browserslist,
                  forceAllTransforms: !isProduction
                },
                modules: false,
                useBuiltIns: false,
                debug: false
              }
            ],
            // Experimental ECMAScript proposals
            // https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-
            'stage-0',
            // Flow
            // https://github.com/babel/babel/tree/master/packages/babel-preset-flow
            'flow',
            // JSX
            // https://github.com/babel/babel/tree/master/packages/babel-preset-react
            'react'
          ],
          plugins: [
            'transform-decorators-legacy',
            ...(!isProduction ? ['transform-react-jsx-source'] : []),
            ...(!isProduction ? ['transform-react-jsx-self'] : [])
          ]
        }
      },
      // Rules for Style Sheets
      {
        test: /\.css/,
        rules: [
          // Process internal/project styles (from client folder)
          {
            include: [
              resolvePath(SRC_DIR, 'ui')
            ],
            use: ExtractTextPlugin.extract({
              fallback: 'isomorphic-style-loader', // Convert CSS into JS module
              use: [
                // Process internal/project styles (from client folder)
                {
                  loader: 'css-loader',
                  options: {
                    // CSS Loader https://github.com/webpack/css-loader
                    importLoaders: 1,
                    sourceMap: !isProduction,
                    camelCase: 'dashes',
                    // CSS Modules https://github.com/css-modules/css-modules
                    modules: true,
                    localIdentName: !isProduction ?
                      '[name]-[local]-[hash:base64:5]' :
                      '[hash:base64:5]',
                    minimize: isProduction,
                    discardComments: {
                      removeAll: true
                    }
                  }
                },
                // Apply PostCSS plugins including autoprefixer
                {
                  loader: 'postcss-loader',
                  options: {
                    config: {
                      path: './tools/postcss/postcss.config.js'
                    }
                  }
                }
              ]
            })
          }
        ]
      },
      // Rules for images
      {
        test: reImage,
        oneOf: [
          // Or return public URL to image resource
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              name: staticAssetName
            }
          }
        ]
      },
      // Rules for fonts
      {
        test: reFont,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          name: staticAssetName
        }
      },
      // Convert plain text into JS module
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
      // Return public URL for all assets unless explicitly excluded
      // DO NOT FORGET to update `exclude` list when you adding a new loader
      {
        exclude: [reScript, reStyle, reImage, reFont, /\.json$/, /\.txt$/, /\.md$/],
        loader: 'file-loader',
        options: {
          name: staticAssetName
        }
      }

    ]
  },

  // Don't attempt to continue if there are any errors.
  // https://webpack.js.org/configuration/devtool/#devtool
  bail: isProduction,
  cache: !isProduction,

  // Choose a developer tool to enhance debugging
  devtool: isProduction ? 'source-map' : 'cheap-module-inline-source-map',

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  // Specify what bundle information gets displayed
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: !isProduction,
    timings: true,
    version: false
  }
};

module.exports = config;
