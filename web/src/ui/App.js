import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import views from './views';

const App = () => {
  return (
    <ScrollToTop>
      <Route render={({ location, history }) => (
        <Layout>
          <Switch>
            {views.map((view, i) => {
              return (
                <Route
                  key={i}
                  path={view.path}
                  exact={view.exact}
                  pageName={view.title}
                  render={props => <view.component key={i} {...props} />}
                />
              );
            })}
          </Switch>
        </Layout>
      )} />
    </ScrollToTop>
  );
};

export default App;
