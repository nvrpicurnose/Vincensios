import { combineReducers } from 'redux';
import contentReducer from './content_reducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  content: contentReducer,
  auth: authReducer
});

export default rootReducer;
