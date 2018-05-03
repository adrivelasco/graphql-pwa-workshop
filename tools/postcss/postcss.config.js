const pkg = require('../../package.json');

module.exports = () => ({
  plugins: [
    require('postcss-global-import')(),
    require('postcss-import')(),
    require('postcss-custom-properties')(),
    require('postcss-custom-media')(),
    require('postcss-media-minmax')(),
    require('postcss-custom-selectors')(),
    require('postcss-calc')(),
    require('postcss-advanced-variables')(),
    require('postcss-nesting')(),
    require('postcss-nested')(),
    require('postcss-color-function')(),
    require('postcss-hexrgba')(),
    require('pleeease-filters')(),
    require('pixrem')(),
    require('postcss-selector-matches')(),
    require('postcss-selector-not')(),
    require('postcss-flexbugs-fixes')(),
    require('postcss-simple-vars')(),
    require('postcss-mixins')(),
    require('postcss-extend')(),
    require('autoprefixer')({
      browsers: pkg.browserslist,
      flexbox: 'no-2009'
    })
  ]
});
