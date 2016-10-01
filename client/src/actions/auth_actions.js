import {AUTH, UNAUTH, AUTH_ERROR} from './action_types';
import axios from 'axios';
import {browserHistory} from 'react-router';

const API_URL = "http://localhost:3090";

export function logout(){
	browserHistory.push('/');
	return {
		type: UNAUTH
	}
}


export function login(loginCreds){
// using redux-thunk to allow for actions with functions
	return function(dispatch){
		// returned for handleSubmit() from reduxForm 
		axios.post(API_URL+'/login', loginCreds)
			.then(response => {
				// if request is good, update state to indicate user is authenticated
				if(response.data){
					dispatch({
						type: AUTH,
						payload: response.data
					})
					// redirect to route
					if(response.data.chef == true){
						browserHistory.push('/chef_dashboard');
					}else{
						browserHistory.push('/diner_dashboard');
					}
				}else{
					dispatch({
						type: AUTH_ERROR,
						payload: "Email or password does not match. User does not exist"
					})
				}
			})
			.catch((err)=>{
				// if request is bad, show an error to user
				console.log(err);
			});
	}
}