import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import Auth from './components/auth/auth_screen';
import Login from './components/auth/login';
import RequireAuth from './components/auth/require_auth';
import ChefsList from './components/chefs_list';
import ChefProfile from './components/chef_profile';

import SignupChef from './components/auth/signup_chef';
import ChefDashboard from './components/chef_dashboard';

import SignupDiner from './components/auth/signup_user';
import DinerDashboard from './components/customer_dashboard';

import Store from './store';

ReactDOM.render(
  <Provider store={Store}>
    <Router history={browserHistory}>
  		<Route path='/' component={App}>
  			<IndexRoute component={ChefsList} />
        <Route path='auth' component={Auth} />
        <Route path='auth/chef_signup' component={SignupChef} />
        <Route path='auth/diner_signup' component={SignupDiner} />
  			<Route path='chef/:id' component={ChefProfile} />
        <Route path='chef_dashboard' component={RequireAuth(ChefDashboard)} />
        <Route path='diner_dashboard' component={RequireAuth(DinerDashboard)} />
  		</Route>
  	</Router>
  </Provider>
  , document.querySelector('.container'));
