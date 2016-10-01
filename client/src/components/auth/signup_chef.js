import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {signupChef} from '../../actions/auth_chef_actions';

class SignupChef extends Component {

	submitChef(){
		const newChef = {
			name: this.refs.chef_name.value,
			phone: this.refs.chef_phone.value,
			email: this.refs.chef_email.value,
			profile_img: this.refs.chef_profile_img.value,
			cover_img: this.refs.chef_cover_img.value,
		};
		this.props.signupChef(newChef);
		browserHistory.push('/chef_dashboard');
	}

	componentWillUpdate(){
		if(this.props.authenticated){
			browserHistory.push('/');
		}
	}
	
	render(){
		return (
			<div className='card card-block'>
				  <h1>SIGN UP NEW CHEF</h1>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput">Name</label>
				    <input ref='chef_name' type="text" className="form-control" placeholder="Joey Lam" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Phone</label>
				    <input ref='chef_phone' type="text" className="form-control" placeholder="519-526-5625" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Email</label>
				    <input ref='chef_email' type="text" className="form-control" placeholder="joey.lam345@email.com" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Profile Image Link</label>
				    <input ref='chef_profile_img' type="text" className="form-control" placeholder="http://facebook.com/3453654/245635_345.jpg" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="formGroupExampleInput2">Cover Image Link</label>
				    <input ref='chef_cover_img' type="text" className="form-control" placeholder="http://google.com/images/gds32d4asdf5.jpg" />
				  </div>
				  <button className='btn btn-primary' onClick={this.submitChef.bind(this)}>Submit Application</button>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		new_chef: state.auth.new_chef,
		authenticated: state.auth.authenticated
	}
}

export default connect(null, {signupChef})(SignupChef);