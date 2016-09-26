import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Async from './middlewares/async';

import App from './components/app';
import ChefsList from './components/user_list';
import ChefProfile from './components/chef_profile';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
  		<Route path='/' component={App}>
  			<IndexRoute component={ChefsList} />
  			<Route path='chef/:id' component={ChefProfile} />
  		</Route>
  	</Router>
  </Provider>
  , document.querySelector('.container'));
