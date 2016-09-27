import { NEW_CHEF, NEW_MEAL, COOKED_MEALS } from './action_types';
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
