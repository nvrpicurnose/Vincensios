import { FETCH_USERS, FETCH_MEALS } from './action_types';
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