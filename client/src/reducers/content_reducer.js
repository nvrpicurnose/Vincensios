import { FETCH_USERS, FETCH_MEALS, GO_TO_CHEF, DEL_CHEF } from '../actions/action_types';
import axios from 'axios';

const initial_state = {
	chefs: [],
	current_chef: null,
	meals: [],
	current_meal: null
}

export default function(state=initial_state, action){
	switch(action.type){
		case FETCH_USERS:
			return {...state, chefs: action.payload.data};
		case FETCH_MEALS:
			return {...state, meals: action.payload.data}
		case GO_TO_CHEF:
			return {...state, current_chef: action.payload}
		case DEL_CHEF:
			return {
				...state,
				chefs: state.chefs.filter(chef=>chef._id !== action.payload.data.deleted._id)
			}
	} 
	return state;
}