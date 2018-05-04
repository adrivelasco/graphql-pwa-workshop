import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    favicon: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired,
    apolloState: PropTypes.object.isRequired,
    children: PropTypes.string.isRequired
  };

  static defaultProps = {
    styles: [],
    scripts: []
  };

  render() {
    const {
      title,
      description,
      children,
      favicon,
      state,
      scripts,
      styles,
      jss,
      apolloState
    } = this.props;
    return (
      <html className="no-js" lang="es">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title} | {description}</title>
          <meta name="description" content={description} />
          <link rel="shortcut icon" href={favicon} />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          {styles.map(style => <link key={style} rel="stylesheet" href={style} />)}
        </head>
        <body>
          {/* <!-- The app hooks into this div --> */}
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <style id="jss-server-side">{jss}</style>
          {/* <!-- Scripts tags --> */}
          <script dangerouslySetInnerHTML={{ __html: `
            window.APP_STATE=${serialize(state)};
            window.APOLLO_STATE=${serialize(apolloState)};
          ` }} />
          {scripts.map(script => <script key={script} src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;
