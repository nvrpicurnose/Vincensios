import { GET_PAST_SUBS, GET_FUTURE_SUBS, GET_PUBS } from '../actions/action_types';

const initial_state = {
	dinerSubs: [],
	dinerSubMeals: [],
	chefPubs: []
}

export default function(state=initial_state, action){
	switch(action.type){
		case GET_PAST_SUBS:
			return {
				...state, 
				dinerSubs: action.payload.subs,
				dinerSubMeals: action.payload.sub_meals
			}
		case GET_FUTURE_SUBS:
			return {
				...state, 
				dinerSubs: action.payload.subs,
				dinerSubMeals: action.payload.sub_meals
			}
	} 
	return state;
}