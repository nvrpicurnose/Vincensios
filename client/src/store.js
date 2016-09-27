import { createStore, applyMiddleware } from 'redux';

import createLogger from 'redux-logger';
import Async from './middlewares/async';

import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(
    Async, 
    createLogger()
)(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;