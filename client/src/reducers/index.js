import { combineReducers } from 'redux';
import contentReducer from './users_reducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  content: contentReducer,
  auth: authReducer
});

export default rootReducer;
