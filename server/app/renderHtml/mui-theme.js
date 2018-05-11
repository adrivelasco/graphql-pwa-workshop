'use strict';

const { SheetsRegistry } = require('react-jss/lib/jss');
const { createMuiTheme, createGenerateClassName } = require('material-ui/styles');
const { green, red } = require('material-ui/colors');

/**
 * Material-UI was designed from the ground-up with the constraint of rendering on the Server,
 * but it's up to you to make sure it's correctly integrated. It's important to provide the page with the required CSS,
 * otherwise the page will render with just the HTML then wait for the CSS to be injected by the client, causing it to
 * flicker. To inject the style down to the client, we need to:
 * Create a fresh, new sheetsRegistry and theme instance on every request.
 * 1. Render the React tree with the server-side API and the instance.
 * 2. Pull the CSS out of the sheetsRegistry.
 * 3. Pass the CSS along to the client.
 * 4. On the client side, the CSS will be injected a second time before removing the server side injected CSS.
 */
class MuiTheme {
  sheetsRegistry;
  theme;
  generateClassName;

  constructor() {
    // Create a sheetsRegistry instance.
    this.sheetsRegistry = new SheetsRegistry();

    // Create a theme instance.
    this.theme = createMuiTheme({
      palette: {
        primary: green,
        accent: red,
        type: 'light'
      }
    });

    this.generateClassName = createGenerateClassName();
  }

  grabCss() {
    // Grab the CSS from our sheetsRegistry.
    return this.sheetsRegistry.toString();
  }
}

module.exports = MuiTheme;
