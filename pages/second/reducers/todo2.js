import { ActionType } from '../action.js'

function todos2(state = [], action) {
    switch (action.type) {
        case ActionType.add2:
            return [
                ...state,
                {
                    name: action.name,
                    value: action.value
                }
            ];
        case ActionType.empty2:
            return [];
        default:
            return state
    }
}

export default todos2;