import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {login} from '../../actions/auth_actions';

class Login extends Component {

	submitLogin(){
		const loginCreds= {
			email: this.refs.email.value,
			password: this.refs.password.value
		}
		this.props.login(loginCreds);
	}

	renderErrorMessage(){
		return (
			<h5>{this.props.authErrorMessage}</h5>
		);
	}

	render(){
		return (
			<div className='card card-block'>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput">Email</label>
				    <input ref='email' type="email" className="form-control" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Password</label>
				    <input ref='password' type="password" className="form-control" />
				  </div>
				  <button className='btn btn-primary' onClick={this.submitLogin.bind(this)}>Log In</button>
				  {this.renderErrorMessage()}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		authenticated: state.auth.authenticated,
		authErrorMessage: state.auth.authErrorMessage
	}
}

export default connect(mapStateToProps, {login})(Login);