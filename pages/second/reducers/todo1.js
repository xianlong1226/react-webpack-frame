import { ActionType } from '../action.js'

function todos1(state = [], action) {
    switch (action.type) {
        case ActionType.add:
            return [
                ...state,
                action.data
            ];
        case ActionType.init:
            return action.data;
        case ActionType.empty:
            return [];
        default:
            return state
    }
}

export default todos1;