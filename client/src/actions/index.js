import { FETCH_USERS, FETCH_MEALS, GO_TO_CHEF, NEW_CHEF, NEW_MEAL, NEW_USER, MY_CHEF_MEALS } from './action_types';
import axios from 'axios';

const API_URL = "http://localhost:3090";

export function fetchUsers(){		
	const usersPromise = axios.get(API_URL+"/chefs")
	return {
		type: FETCH_USERS,
		payload: usersPromise
	}
}

// Thunk async middleware method
export function fetchMeals(chef){	
	const mealsPromise = axios.get(API_URL+"/meals?chef_id="+chef._id)
	return {
		type: FETCH_MEALS,
		payload: mealsPromise
	}
}

export function goToChef(chef){
	return {
		type: GO_TO_CHEF,
		payload: chef
	}
}


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
