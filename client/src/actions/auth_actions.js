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
				console.log(response.data.results);
				// if request is good, update state to indicate user is authenticated
				if(response.data.results[0] || response.data.results[1]){
					dispatch({
						type: AUTH,
						payload: response
					})
					// redirect to route '/feature'
					browserHistory.push('/');
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