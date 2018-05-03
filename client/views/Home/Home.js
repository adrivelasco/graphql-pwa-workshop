import React from 'react';

import Typography from 'material-ui/Typography';
import Button from '../../components/Button';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="title">
          View: Homepage
        </Typography>
        <Typography noWrap>
          Hello! This is simple test of Material-UI Next library component.
        </Typography>
        <div>
          <Button>Customized Button</Button>
        </div>
      </div>
    );
  }
}

export default Home;
