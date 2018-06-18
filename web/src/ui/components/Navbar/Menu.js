import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import Container from '../Container';
import styles from './Menu.css';

class Menu extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    compacted: PropTypes.bool,
    active: PropTypes.bool,
    children: PropTypes.node
  };

  static defaultProps = {
    active: false,
    onClick: () => null
  };

  state = {
    active: this.props.active
  };

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ active: !this.state.active }, () => {
      this.props.onClick();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.active && this.state.active && this.state.active !== this.props.active) {
      this.setState({
        active: this.props.active
      });
    };
  }

  render() {
    const { children, compacted } = this.props;
    if (compacted) {
      return (
        <div>
          <div
            onClick={this.toggleMenu}
            className={cs({
              [styles.button]: true,
              [styles.active]: this.state.active
            })}
          >
            <div className={styles.bars}>
              <div className={styles.bar} />
              <div className={styles.bar} />
              <div className={styles.bar} />
            </div>
          </div>
          <div
            className={cs({
              [styles.overlay]: true,
              [styles.open]: this.state.active
            })}
          >
            <div className={styles.overlayContent}>
              <Container>
                {children}
              </Container>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.root}>
        {children}
      </div>
    );
  };
}

export default Menu;
