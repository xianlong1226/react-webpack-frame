export const ActionType = {
    init: 'init',
    add: 'add',
    empty: 'empty',
    add2: 'add2',
    empty2: 'empty2'
}

export function CreateAction(type, data){
    return {
        type: type,
        data: data
    }
}