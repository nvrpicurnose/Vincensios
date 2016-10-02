import { NEW_CHEF, NEW_MEAL, COOKED_MEALS, DEL_CHEF, DEL_MEAL, GET_FUTURE_PUBS, GET_PAST_PUBS } from './action_types';
import axios from 'axios';

const API_URL = "http://localhost:3090";


export function signupChef(newChef){
	const newChefPromise = axios.post(API_URL+"/chef", newChef);
	return {
		type: NEW_CHEF,
		payload: newChefPromise
	}
}


export function submitNewMeal(newMeal){
	const newMealPromise = axios.post(API_URL+"/meal", newMeal);
	return {
		type: NEW_MEAL,
		payload: newMealPromise
	}
}

export function delChef(chef){
	const delChefPromise = axios.post(API_URL+"/del_chef", chef)
	return {
		type: DEL_CHEF,
		payload: delChefPromise
	}
}

export function delMeal(meal){
	const delMealPromise = axios.post(API_URL+"/del_meal", meal)
	return {
		type: DEL_MEAL,
		payload: delMealPromise
	}
}

export function myKitchenMeals(chef){
	const mealsPromise = axios.get(API_URL+"/meals?chef_id="+chef._id)
	return {
		type: COOKED_MEALS,
		payload: mealsPromise
	}
}

export function loadAsyncPastPublications(currentUser){
	return function(dispatch){
		const pastSinceUnix = Date.parse(new Date());
		axios.get(API_URL+"/past_pubs?chef_id="+currentUser._id+"&pastSince="+pastSinceUnix)
			.then(response => {
				// if request is good, update state to indicate user is authenticated
				if(response.data){
					dispatch({
						type: GET_PAST_PUBS,
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

export function loadAsyncFuturePublications(currentUser){
	return function(dispatch){
		const futureSinceUnix = Date.parse(new Date());
		axios.get(API_URL+"/future_pubs?chef_id="+currentUser._id+"&futureSince="+futureSinceUnix)
			.then(response => {
				// if request is good, update state to indicate user is authenticated
				if(response.data){
					dispatch({
						type: GET_FUTURE_PUBS,
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
