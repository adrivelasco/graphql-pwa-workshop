'use strict';

// Babel register for read ES6
const fs = require('fs');
const babelrc = fs.readFileSync('./.babelrc');
let babelConfig;

try {
  babelConfig = JSON.parse(babelrc);
} catch (err) {
  console.error('==> ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-polyfill');
require('babel-register')(babelConfig);
require('babel-core').transform('code', babelConfig);
