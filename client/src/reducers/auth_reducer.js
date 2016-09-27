import { NEW_CHEF, NEW_CUSTOMER, COOKED_MEALS, NEW_MEAL } from '../actions/action_types';
import axios from 'axios';
import store from '../store';

const initial_state = {
	currentChefUser: {},
	currentChefMeals: [],
	currentCustomerUser: {}
}

export default function(state=initial_state, action){
	switch(action.type){
		case NEW_CHEF:
			return {
				...state, 
				currentChefUser: action.payload.data.success
			};
		case COOKED_MEALS:
			return {
				...state,
				currentChefMeals: action.payload.data
			}
		case NEW_MEAL:
			return state
		case NEW_CUSTOMER:
			return {...state, currentCustomerUser: action.payload.data.success}
	} 
	return state;
}