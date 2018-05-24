'use strict';

const config = require('../../config');
const isProduction = config.env === 'production';

// The require hook compiles CSS Modules in runtime. This is similar to Babel's babel/register.
// https://github.com/css-modules/css-modules-require-hook
const cssModulesRequireHook = require('css-modules-require-hook');

cssModulesRequireHook({
  extensions: ['.css'],
  camelCase: 'dashes',
  generateScopedName: !isProduction
    ? '[name]-[local]-[hash:base64:5]'
    : '[hash:base64:5]'
});
