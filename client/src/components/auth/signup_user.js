import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {signupUser} from '../../actions/auth_user_actions';

class SignupUser extends Component {

	submitUser(){
		const newUser = {
			name: this.refs.user_name.value,
			phone: this.refs.user_phone.value,
			email: this.refs.user_email.value,
			profile_img: this.refs.user_profile_img.value
		};
		this.props.signupUser(newUser);
		browserHistory.push('/diner_dashboard');
	}

	componentWillUpdate(){
		if(this.props.authenticated){
			browserHistory.push('/');
		}
	}
	
	render(){
		return (
			<div className='card card-block'>
				  <h1>SIGN UP NEW DINER</h1>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput">Name</label>
				    <input ref='user_name' type="text" className="form-control" placeholder="Joey Lam" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Phone</label>
				    <input ref='user_phone' type="text" className="form-control" placeholder="519-526-5625" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Email</label>
				    <input ref='user_email' type="text" className="form-control" placeholder="joey.lam345@email.com" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Profile Image Link</label>
				    <input ref='user_profile_img' type="text" className="form-control" placeholder="http://facebook.com/3453654/245635_345.jpg" />
				  </div>
				  <button className='btn btn-primary' onClick={this.submitUser.bind(this)}>Sign Up</button>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		new_user: state.auth.new_user,
		authenticated: state.auth.authenticated
	}
}

export default connect(null, {signupUser})(SignupUser);