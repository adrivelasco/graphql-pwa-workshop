'use strict';

const isDebug = process.env.NODE_ENV === 'development';

// Hook for statics files such as images or css files
const cssModulesHook = require('css-modules-require-hook');
cssModulesHook({
  extensions: ['.css'],
  camelCase: 'dashes',
  generateScopedName: isDebug
    ? '[name]-[local]-[hash:base64:5]'
    : '[hash:base64:5]'
});
