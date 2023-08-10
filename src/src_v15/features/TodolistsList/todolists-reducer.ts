import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setStatusAC, SetStatusType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/errors-utils';
import axios from 'axios';
import {ErrorType} from './tasks-reducer';

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE-TODOLIST-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistsStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-STATUS',
    id,
    status
} as const)

// thunks
export const fetchTodolistsTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
        dispatch(setStatusAC('succeeded'))

    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(error, dispatch)
        }
        const error = (e as Error).message
        handleServerNetworkError(error, dispatch)
    }
}

export const removeTodolistTC = (todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeTodolistsStatusAC(todolistId, 'loading'))
        try {
           await todolistsAPI.deleteTodolist(todolistId)
            dispatch(removeTodolistAC(todolistId))
            dispatch(setStatusAC('succeeded'))
        }
    catch (e) {
            if (axios.isAxiosError<ErrorType>(e)) {
                dispatch(changeTodolistsStatusAC(todolistId, 'idle'))
                const error = e.response ? e.response?.data.messages[0].message : e.message
                handleServerNetworkError(error, dispatch)
            }
            const error = (e as Error).message
            handleServerNetworkError(error, dispatch)
        }
    }
export const addTodolistTC = (title: string) =>
   async (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
         try {
            const res = await todolistsAPI.createTodolist(title)
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            }
         catch (e) {
             if (axios.isAxiosError<ErrorType>(e)) {
                 const error = e.response ? e.response?.data.messages[0].message : e.message
                 handleServerNetworkError(error, dispatch)
             }
             const error = (e as Error).message
             handleServerNetworkError(error, dispatch)
         }
    }

export const changeTodolistTitleTC = (id: string, title: string) => async  (dispatch: Dispatch<ActionsType>) => {
        dispatch(setStatusAC('loading'))
    try{
            await todolistsAPI.updateTodolist(id, title)
        // const foundTl = id.find((tl: any) => tl.id === title)
        dispatch(changeTodolistTitleAC(id, title))
                dispatch(setStatusAC('succeeded'))
    }
    catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(error, dispatch)
        }
        const error = (e as Error).message
        handleServerNetworkError(error, dispatch)
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | SetStatusType
    | ReturnType<typeof changeTodolistsStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
