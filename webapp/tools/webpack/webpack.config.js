'use strict';

require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('../../package.json');

const isProduction = process.argv.includes('--env.production');

const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const reFont = /\.(eot|otf|ttf|woff|woff2)$/;
const staticAssetName = '[name].[ext]';

const config = {
  context: path.resolve(__dirname, '../..'),

  name: 'client',

  target: 'web',

  mode: isProduction ? 'production' : 'development',

  entry: {
    client: ['babel-polyfill', './client/app.js']
  },

  resolve: {
    modules: ['node_modules', 'client']
  },

  output: {
    path: path.resolve(__dirname, '../../build/static'),
    publicPath: '/static/',
    filename: !isProduction
      ? 'js/[name].js'
      : 'js/[name].[hash:8].js',
    chunkFilename: !isProduction
      ? 'js/[name].js'
      : 'js/[name].[hash:8].js'
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
    }
  },

  plugins: [
    // Extract all CSS files and compile it on a single file
    new ExtractTextPlugin({
      filename: !isProduction ? '[name].css' : '[name].[contenthash:base64:8].css',
      publicPath: '/static/css',
      allChunks: true
    }),

    // Define free variables
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': !isProduction ? '"development"' : '"production"',
      'process.env.BROWSER': true
    }),

    // Emit a file with assets paths
    new AssetsPlugin({
      path: path.resolve(__dirname, '../../build'),
      filename: 'assets.json',
      prettyPrint: true
    }),

    ...(isProduction
      ? [
        // Decrease script evaluation time
        new webpack.optimize.ModuleConcatenationPlugin(),

        // Minimize all JavaScript output of chunks
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            screw_ie8: true,
            warnings: false,
            unused: true,
            dead_code: true
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          }
        })
      ]
      : [
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
          path.resolve(__dirname, '../../client'),
          path.resolve(__dirname, '../../tools')
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
            include: [path.resolve(__dirname, '../../client')],
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
                    localIdentName: !isProduction
                      ? '[name]-[local]-[hash:base64:5]'
                      : '[hash:base64:5]',
                    minimize: isProduction,
                    discardComments: { removeAll: true }
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
      // Convert Markdown into HTML
      {
        test: /\.md$/,
        loader: path.resolve(__dirname, './lib/markdown-loader.js')
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
