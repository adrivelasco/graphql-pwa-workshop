import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Creates the main reducer with the dynamically injected ones
export default combineReducers({

  // React-Router-Redux
  routing: routerReducer

});
