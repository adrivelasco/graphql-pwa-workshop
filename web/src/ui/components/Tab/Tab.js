import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import styles from './Tab.css';

class Tab extends React.Component {
  state = {
    tabActive: this.props.active
  };

  selectTab(event, { tabIndex }) {
    this.setState({
      tabActive: tabIndex
    });
  }

  render() {
    const panes = this.props.panes || [];
    const activePane = panes[this.state.tabActive];
    const renderPane = activePane && typeof activePane.render === 'function'
      ? activePane.render
      : () => null;
    return (
      <div>
        <div className={styles.tabs}>
          {panes.map((pane, i) => {
            const isActive = this.state.tabActive === i;
            return (
              <Button
                key={i}
                active={isActive}
                onClick={(event) => this.selectTab(event, { tabIndex: i })}
              >
                {pane.menuItem}
              </Button>
            );
          })}
        </div>
        <div className={styles.pane}>{renderPane()}</div>
      </div>
    );
  }
}

Tab.propTypes = {
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  panes: PropTypes.arrayOf(PropTypes.shape({
    menuItem: PropTypes.string,
    render: PropTypes.func.isRequired
  }))
};

Tab.defaultProps = {
  active: 0,
  panes: []
};

export default Tab;
