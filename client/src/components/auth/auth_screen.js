import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Login from './login';

class AuthScreen extends Component {
	constructor(props) {
	    super(props);
	    this.state = { signUp: false };
	}
	triggerSignForm(){
		this.setState({signUp: !this.state.signUp});
	}

	renderSignIn(){
		if(!this.state.signUp){
			return (
				<div>
					<Login />
					<p onClick={this.triggerSignForm.bind(this)}>Sign Up</p>
				</div>
			);
		}
	}

	renderSignUp(){
		if(this.state.signUp){
			return (
				<div>
					<h2>Sign Up As..</h2>
					<button onClick={()=>this.redirectTo('chef')} className='btn btn-primary'>Chef</button>
					<button onClick={()=>this.redirectTo('diner')} className='btn btn-primary'>Diner</button>
					<p onClick={this.triggerSignForm.bind(this)}>Back To Login</p>
				</div>
			);
		}
	}

	redirectTo(url){
		browserHistory.push('/auth/'+url+'_signup');
	}

	render(){
		return (
			<div>
				<h4>Authentication</h4>
				{this.renderSignIn()}
				{this.renderSignUp()}
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps)(AuthScreen);