import { combineReducers } from 'redux';
import todos1 from './todo1.js'
import todos2 from './todo2.js'

const rootReducer = combineReducers({
    todos1,
    todos2
});

export default rootReducer;