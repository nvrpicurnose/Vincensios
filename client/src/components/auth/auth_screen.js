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
					<button className='btn btn-block' onClick={this.triggerSignForm.bind(this)}>Sign Up</button>
				</div>
			);
		}
	}

	renderSignUp(){
		if(this.state.signUp){
			return (
				<div>
					<div className='titleBar'><h2>Sign Up</h2></div>
					<button onClick={()=>this.redirectTo('chef')} className='btn btn-primary btn-block signupType' >Chef</button>
					<button onClick={()=>this.redirectTo('diner')} className='btn btn-primary btn-block signupType' >Diner</button>
					<button className='btn btn-block' onClick={this.triggerSignForm.bind(this)}>Back To Login</button>
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