import createBrowserHistory from 'history/createBrowserHistory';

// Abstracts away the differences in various environments and provides
// a minimal API that lets you manage the history stack
// https://github.com/ReactTraining/history
const history = process.env.BROWSER && createBrowserHistory();

export default history;
