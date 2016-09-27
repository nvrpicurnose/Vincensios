import { NEW_CHEF, MY_CHEF_MEALS } from '../actions/action_types';
import axios from 'axios';

const API_URL = "http://localhost:3090";

export default function({dispatch}){
	return next => action => {
		console.log(action.payload);
		switch(action.type){
			case NEW_CHEF:{
				const myChefMealsPromise = axios.post(API_URL+"/meals", action.payload.data.success._id)
				dispatch({
					type: MY_CHEF_MEALS,
					payload: myChefMealsPromise
				});
				next(action);
			}
		} 
		next(action);
	}
}