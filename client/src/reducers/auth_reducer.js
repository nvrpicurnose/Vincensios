import { NEW_CHEF, NEW_DINER, COOKED_MEALS, NEW_MEAL, DEL_CHEF, DEL_MEAL, AUTH, UNAUTH, AUTH_ERROR, SUBSCRIBE } from '../actions/action_types';
import axios from 'axios';
import store from '../store';

const initial_state = {
	currentUser: {},
	currentSubscribedMeals: [],
	currentCookedMeals: [],
	authenticated: false,
	authErrorMessage: null
}

export default function(state=initial_state, action){
	switch(action.type){
		case AUTH:
			return {
				...state,
				currentUser: action.payload,
				authenticated: true
			}
		case UNAUTH:
			return {
				...state,
				currentUser: null,
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
				currentUser: action.payload.data.success
			}
		case COOKED_MEALS:
			return {
				...state,
				currentCookedMeals: action.payload.data
			}
		case NEW_MEAL:
			return {
				...state,
				currentCookedMeals: state.currentCookedMeals.concat(action.payload.data.success)
			}
		case DEL_CHEF:
			return {
				...state,
				currentUser: null
			}
		case DEL_MEAL:
			return {
				...state,
				currentCookedMeals: state.currentCookedMeals.filter(meal=> meal._id !== action.payload.data.deleted._id)
			}
			return state
		case NEW_DINER:
			return {
				...state, 
				authenticated: true,
				currentUser: action.payload.data.success
			}
	} 
	return state;
}