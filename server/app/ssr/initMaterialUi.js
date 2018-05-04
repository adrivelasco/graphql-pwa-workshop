'use strict';

const { SheetsRegistry } = require('react-jss/lib/jss');
const { createMuiTheme, createGenerateClassName } = require('material-ui/styles');
const { green, red } = require('material-ui/colors');

function initMaterialUi() {
  const sheetsRegistry = new SheetsRegistry();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light'
    }
  });

  return {
    sheetsRegistry,
    theme,
    generateClassName: createGenerateClassName()
  };
}

module.exports = initMaterialUi;
