import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

/**
 * Scroll to Top Component
 */
class ScrollToTop extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location && 'scrollTop' in window.document.body) {
      window.document.body.scrollTop = window.document.documentElement.scrollTop = 0;
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
