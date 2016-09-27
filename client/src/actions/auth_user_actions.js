import { NEW_CUSTOMER } from './action_types';
import axios from 'axios';

const API_URL = "http://localhost:3090";


export function signupUser(newUser){
	const newUserPromise = axios.post(API_URL+"/user", newUser);
	return {
		type: NEW_CUSTOMER,
		payload: newUserPromise
	}
}
