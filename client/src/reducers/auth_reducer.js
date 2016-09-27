import { NEW_CHEF, NEW_CUSTOMER, MY_CHEF_MEALS, NEW_MEAL } from '../actions/action_types';
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
		case MY_CHEF_MEALS:
			return {
				...state,
				currentChefMeals: action.payload.data
			}
		case NEW_MEAL:
			return state
		case NEW_CUSTOMER:
			return state;
			//return {...state, new_user: action.payload}
	} 
	return state;
}