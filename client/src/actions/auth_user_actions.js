import { NEW_DINER, SUBSCRIBE, FAILED_TO_SUBSCRIBE, GET_PAST_SUBS, GET_FUTURE_SUBS, LOAD_SUB_MEALS } from './action_types';
import axios from 'axios';
import {browserHistory} from 'react-router';

const API_URL = "http://localhost:3090";


export function signupUser(newUser){
	const newUserPromise = axios.post(API_URL+"/diner", newUser);
	return {
		type: NEW_DINER,
		payload: newUserPromise
	}
}

export function subscribeChef(chef, currentUser, startDate, endDate){
	return function(dispatch){
		if(currentUser && currentUser._id){
			const newSub = {
				chef_id: chef._id,
				chef_name: chef.name,
				diner_id: currentUser._id,
				diner_name: currentUser.name,
				startDate: startDate,
				endDate: endDate
			}
			axios.post(API_URL+"/subscription", newSub)
				.then(response => {
					if(response.data.success){
						dispatch({
							type: SUBSCRIBE,
							payload: response.data.message
						});
					}else{
						console.log(response);
						dispatch({
							type: FAILED_TO_SUBSCRIBE,
							payload: response.data.message
						})
					}
				});
		}else{
			browserHistory.push('/auth');
		}
	}
}

export function loadAsyncPastSubscriptions(currentUser){
	return function(dispatch){
		const pastSinceUnix = Date.parse(new Date());
		axios.get(API_URL+"/past_subs?diner_id="+currentUser._id+"&pastSince="+pastSinceUnix)
			.then(response => {
				// if request is good, update state to indicate user is authenticated
				if(response.data){
					dispatch({
						type: GET_PAST_SUBS,
						payload: response.data
					});
				}
			})
			.catch((err)=>{
				// if request is bad, show an error to user
				console.log(err);
			});
	}
}

export function loadAsyncFutureSubscriptions(currentUser){
	return function(dispatch){
		const futureSinceUnix = Date.parse(new Date());
		axios.get(API_URL+"/future_subs?diner_id="+currentUser._id+"&futureSince="+futureSinceUnix)
			.then(response => {
				// if request is good, update state to indicate user is authenticated
				if(response.data){
					dispatch({
						type: GET_FUTURE_SUBS,
						payload: response.data
					});
				}
			})
			.catch((err)=>{
				// if request is bad, show an error to user
				console.log(err);
			});
	}
}
