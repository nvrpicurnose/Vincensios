import { combineReducers } from 'redux';
import contentReducer from './content_reducer';
import authReducer from './auth_reducer';
import calendarReducer from './calendar_reducer';

const rootReducer = combineReducers({
  content: contentReducer,
  auth: authReducer,
  calendar: calendarReducer
});

export default rootReducer;
