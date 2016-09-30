import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import ChefsList from './components/chefs_list';
import ChefProfile from './components/chef_profile';

import SignupChef from './components/auth/signup_chef';
import ChefDashboard from './components/chef_dashboard';

import SignupCustomer from './components/auth/signup_user';
import CustomerDashboard from './components/customer_dashboard';

import Store from './store';

ReactDOM.render(
  <Provider store={Store}>
    <Router history={browserHistory}>
  		<Route path='/' component={App}>
  			<IndexRoute component={ChefsList} />
  			<Route path='chef/:id' component={ChefProfile} />
  			<Route path='chef_signup' component={SignupChef} />
        <Route path='chef_dashboard' component={ChefDashboard} />
        <Route path='customer_signup' component={SignupCustomer} />
        <Route path='customer_dashboard' component={CustomerDashboard} />
  		</Route>
  	</Router>
  </Provider>
  , document.querySelector('.container'));
