import { combineReducers } from 'redux';
import contentReducer from './users-reducer';

const rootReducer = combineReducers({
  content: contentReducer
});

export default rootReducer;
