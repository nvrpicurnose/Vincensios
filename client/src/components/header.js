import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {login, logout} from '../actions/auth_actions';
 
class Header extends Component {

	logout(){
		this.props.logout();
	}

	chefDashboardButton(){
		if(this.props.authenticated && this.props.currentUser && this.props.currentUser.chef){
			return (
				<li className='nav-item'>
					<Link to='/chef_dashboard'>My Kitchen</Link>
				</li>
			)
		}
	}

	userDashboardButton(){
		if(this.props.authenticated && this.props.currentUser && this.props.currentUser.diner){
			return (
				<li className='nav-item'>
					<Link to='/diner_dashboard'>Dining Table</Link>
				</li>
			);
		}
	}

	authButton(){
		if(this.props.authenticated){
			return (<li className='nav-item' onClick={this.logout.bind(this)}>Logout</li>);
		}
		return (
			<li className='nav-item'>
				<Link to='/auth'>Login</Link>
			</li>
		);
	}

	static contextTypes = {
		router: React.PropTypes.object
	}

	backButton(){
		this.context.router.goBack()
	}

	render(){
		return (
			<nav className='navbar navbar-light'>
				<ul className='nav navbar-nav'>
					<li className='nav-item' onClick={this.backButton.bind(this)}>
						Back
					</li>
					<li className='nav-item'>
						<Link to='/'>Browse</Link>
					</li>
					{this.chefDashboardButton()}
					{this.userDashboardButton()}
					{this.authButton()}
				</ul>
			</nav>
		);
	}
}

function mapStateToProps(state){
	return {
		authenticated: state.auth.authenticated,
		currentUser: state.auth.currentUser,
		currentUser: state.auth.currentUser
	}
}

export default connect(mapStateToProps, {login, logout})(Header);