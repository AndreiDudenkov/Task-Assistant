import {TodolistType} from '../App';

export const TodolistsReducer = (state: TodolistType[], action: TsarTypeAction): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {

            return state.filter(tl => tl.id != action.payload.todolistId)
        }
        default: return state
    }
}
type TsarTypeAction = removeTodolistACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}