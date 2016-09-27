import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {signupUser} from '../../actions/auth_user_actions';

class Login extends Component {

	login(){
		const newUser = {
			
		}
	}

	render(){
		return (
			<div className='card card-block'>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput">Username</label>
				    <input ref='name' type="text" className="form-control" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Password</label>
				    <input ref='cover_img' type="password" className="form-control" />
				  </div>
				  <button className='btn btn-primary' onClick={this.login.bind(this)}>Log In</button>
			</div>
		);
	}
}


export default connect(null, {signupUser})(Login);