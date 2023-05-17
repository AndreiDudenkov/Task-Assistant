import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';


export const TodolistsReducer = (state: TodolistType[], action: TsarTypeAction): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {

            return state.filter(tl => tl.id != action.payload.todolistId)
        }
        case 'ADD-TODOLIST' : {
            let newTodolistId = v1();
            let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title:  action.payload.newTitle}
                : tl)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter:  action.payload.newFilter}
                : tl)
        }
        default:
            return state

    }
}
type TsarTypeAction = removeTodolistACType | AddTodolistACType | newTodolistTitleACType | changeTodolistFilterACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}
type newTodolistTitleACType = ReturnType<typeof newTodolistTitleAC>
export const newTodolistTitleAC = (todolistId:string,newTitle:string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTitle
        }
    } as const
}
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType ) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            newFilter
        }
    } as const
}