import { GO_TO_CHEF } from './action_types';

export function goToChef(chef){
	return {
		type: GO_TO_CHEF,
		payload: chef
	}
}

