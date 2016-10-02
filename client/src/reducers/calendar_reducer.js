import { GET_PAST_SUBS, GET_FUTURE_SUBS, GET_PAST_PUBS, GET_FUTURE_PUBS, SUBSCRIBE, UNSUBSCRIBE, FAILED_TO_SUBSCRIBE } from '../actions/action_types';

const initial_state = {
	dinerSubs: [],
	dinerSubMeals: [],
	chefPubs: [],
	chefPubMeals: [],
	subscriptionMessage: null
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
		case GET_PAST_PUBS:
			return {
				...state, 
				chefPubs: action.payload.pubs,
				chefPubMeals: action.payload.pub_meals
			}
		case GET_FUTURE_PUBS:
			return {
				...state, 
				chefPubs: action.payload.pubs,
				chefPubMeals: action.payload.pub_meals
			}
		case SUBSCRIBE:
			return {
				...state, 
				subscriptionMessage: action.payload
			}
		case FAILED_TO_SUBSCRIBE:
			return {
				...state, 
				subscriptionMessage: action.payload
			}
	} 
	return state;
}