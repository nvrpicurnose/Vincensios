import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import ChefsList from './components/user_list';
import ChefProfile from './components/chef_profile';
import SignupChef from './components/auth/signup_chef';
import ChefDashboard from './components/chef_dashboard';

import Store from './store';

ReactDOM.render(
  <Provider store={Store}>
    <Router history={browserHistory}>
  		<Route path='/' component={App}>
  			<IndexRoute component={ChefsList} />
  			<Route path='chef/:id' component={ChefProfile} />
  			<Route path='signup' component={SignupChef} />
        <Route path='chef_dashboard' component={ChefDashboard} />
  		</Route>
  	</Router>
  </Provider>
  , document.querySelector('.container'));
