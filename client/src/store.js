import { createStore, applyMiddleware } from 'redux';

import createLogger from 'redux-logger';
import Async from './middlewares/async';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(
    Async, 
    reduxThunk,
    createLogger()
)(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;