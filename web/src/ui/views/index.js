import Home from './Home';
import Detail from './Detail';

const views = [

  // Homepage
  {
    path: '/',
    exact: true,
    title: 'Home',
    component: Home
  },

  // Detail
  {
    path: '/:name',
    exact: true,
    title: 'Detail',
    component: Detail
  }
];

export default views;
