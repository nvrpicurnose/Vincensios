import { NEW_CHEF, NEW_DINER, COOKED_MEALS, NEW_MEAL, DEL_CHEF, DEL_MEAL, AUTH, UNAUTH, AUTH_ERROR } from '../actions/action_types';
import axios from 'axios';
import store from '../store';

const initial_state = {
	currentChefUser: {},
	currentChefMeals: [],
	currentCustomerUser: {},
	authenticated: false,
	authErrorMessage: null
}

export default function(state=initial_state, action){
	switch(action.type){
		case AUTH:
			const authd = Boolean(action.payload.data.results[0]) || Boolean(action.payload.data.results[1])
			return {
				...state,
				currentChefUser: action.payload.data.results[0],
				currentCustomerUser: action.payload.data.results[1],
				authenticated: authd
			}
		case UNAUTH:
			return {
				...state,
				currentChefUser: null,
				currentCustomerUser: null,
				authenticated: false
			}
		case AUTH_ERROR:
			return {
				...state,
				authErrorMessage: action.payload
			}
		case NEW_CHEF:
			return {
				...state, 
				authenticated: true,
				currentChefUser: action.payload.data.success
			}
		case COOKED_MEALS:
			return {
				...state,
				currentChefMeals: action.payload.data
			}
		case NEW_MEAL:
			return {
				...state,
				currentChefMeals: state.currentChefMeals.concat(action.payload.data.success)
			}
		case DEL_CHEF:
			return {
				...state,
				currentChefUser: null
			}
		case DEL_MEAL:
			return {
				...state,
				currentChefMeals: state.currentChefMeals.filter(meal=> meal._id !== action.payload.data.deleted._id)
			}
			return state
		case NEW_DINER:
			return {
				...state, 
				authenticated: true,
				currentCustomerUser: action.payload.data.success
			}
	} 
	return state;
}