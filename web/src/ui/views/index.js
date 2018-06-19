import Home from './Home';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';

const views = [

  {
    path: '/',
    exact: true,
    title: 'Home',
    component: Home
  },

  {
    path: '/login',
    exact: true,
    title: 'SignIn',
    component: SignIn
  },

  {
    path: '/create-account',
    exact: true,
    title: 'CreateAccount',
    component: CreateAccount
  }
];

export default views;
