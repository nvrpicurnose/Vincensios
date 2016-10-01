import { NEW_DINER, SUBSCRIBE, GET_PAST_SUBS, GET_FUTURE_SUBS, LOAD_SUB_MEALS } from './action_types';
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

export function subscribeChef(chef, currentUser){
	if(currentUser && currentUser._id){
		const newSub = {
			chef_id: chef._id,
			diner_id: currentUser._id,
			startDate: new Date,
			endDate: new Date
		}
		const newSubPromise = axios.post(API_URL+"/subscription", newSub);
		return {
			type: SUBSCRIBE,
			payload: newSubPromise
		}
	}else{
		browserHistory.push('/auth');
	}
}

export function loadPastSubscriptions(currentUser, pastSince){
	const pastSinceUnix = Date.parse(pastSince);
	const pastSubsPromise = axios.get(API_URL+"/past_subs?diner_id="+currentUser._id+"&pastSince="+pastSinceUnix);
	return {
		type: GET_PAST_SUBS,
		payload: pastSubsPromise
	}
}

export function loadFutureSubscriptions(currentUser, futureSince){
	const futureSinceUnix = Date.parse(futureSince);
	const futureSubsPromise = axios.get(API_URL+"/future_subs?diner_id="+currentUser._id+"&futureSince="+futureSinceUnix);
	return {
		type: GET_FUTURE_SUBS,
		payload: futureSubsPromise
	}
}

export function loadAsyncPastSubscriptions(currentUser, pastSince){
	return function(dispatch){
		const pastSinceUnix = Date.parse(pastSince);
		axios.get(API_URL+"/past_subs?diner_id="+currentUser._id+"&pastSince="+pastSinceUnix)
			.then(response => {
				// if request is good, update state to indicate user is authenticated
				if(response.data){
					dispatch({
						type: GET_PAST_SUBS,
						payload: response.data
					});
					loadMealsFromSubs(response.data);
				}
			})
			.catch((err)=>{
				// if request is bad, show an error to user
				console.log(err);
			});
	}
}

function loadMealsFromSubs(subs){
	console.log("===================");
	console.log(subs);
	// how to async chain
	return function(dispatch){
		subs.forEach((sub)=>{
			console.log(sub);
			const startDate = Date.parse(sub.startDate);
			const endDate = Date.parse(sub.endDate);
			axios.get(API_URL+"/subscriptionMeals?chef_id="+sub.chef_id+"&startDate="+startDate+"&endDate="+endDate)
				.then(response => {
					// if request is good, update state to indicate user is authenticated
					if(response.data){
						dispatch({
							type: LOAD_SUB_MEALS,
							payload: response.data
						});
					}
				})
				.catch((err)=>{
					// if request is bad, show an error to user
					console.log(err);
				});
		})
	}
}