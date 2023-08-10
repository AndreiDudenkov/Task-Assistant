import {
    AddTodolistActionType,
    changeTodolistsStatusAC,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer'
import {
    Result_Code,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {RequestStatusType, setErrorAC, SetErrorType, setStatusAC, SetStatusType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/errors-utils';
import axios, {AxiosError} from 'axios';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case 'CHANGE-TASKS-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map
                (t => t.id === action.taskId ? {...t, entityStatus: action.status} : t)
            }
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)
export const changeTaskStatusAC = (taskId: string, todolistId: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TASKS-STATUS', taskId, todolistId, status} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {

    dispatch(setStatusAC('loading'))

    try {
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        const action = setTasksAC(tasks, todolistId)
        dispatch(action)
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

export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeTaskStatusAC(taskId, todolistId, 'loading'))

    try {
        await todolistsAPI.deleteTask(todolistId, taskId)
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
        dispatch(setStatusAC('succeeded'))

    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            dispatch(changeTaskStatusAC(taskId, todolistId, 'idle'))
            handleServerNetworkError(error, dispatch)
        }
        const error = (e as Error).message
        handleServerNetworkError(error, dispatch)
    }
}

export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))

    try {
        const res = await todolistsAPI.createTask(todolistId, title)

        // const foundTl = res.data.find((tl: any) => tl.id === todolistId)

        if (res.data.resultCode === Result_Code.OK) {
            const task = res.data.data.item
            dispatch(addTaskAC(task))
            dispatch(setStatusAC('succeeded'))
        } else {
            if (res.data.messages.length) {
                dispatch(setErrorAC(res.data.messages[0]))
            } else {
                dispatch(setErrorAC('Some error occurred'))
            }
            dispatch(setStatusAC('failed'))
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(error, dispatch)
        }
        const error = (e as Error).message
        handleServerNetworkError(error, dispatch)
    }
}

export type ErrorType = {
    statusCode: number
    messages: [
        {
            message: string,
            field: string
        }
    ]
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
        async (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        dispatch(setStatusAC('loading'))
            dispatch(changeTaskStatusAC(taskId, todolistId, 'loading'))
            const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

         try {
            const res =  await todolistsAPI.updateTask(todolistId, taskId, apiModel)
             // const foundTl = taskId.find((tl: any) => tl.id === todolistId)
                     if (res.data.resultCode === Result_Code.OK) {
                         dispatch(changeTaskStatusAC(taskId, todolistId, 'idle'))
                         const action = updateTaskAC(taskId, domainModel, todolistId)
                         dispatch(action)
                         dispatch(setStatusAC('succeeded'))
                     } else {
                         handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                     }
         }
            catch (e) {
                dispatch(changeTaskStatusAC(taskId, todolistId, 'idle'))
                if (axios.isAxiosError<ErrorType>(e)) {
                    const error = e.response ? e.response?.data.messages[0].message : e.message
                    handleServerNetworkError(error, dispatch)

                }
                const error = (e as Error).message
                handleServerNetworkError(error, dispatch)
            }
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>

}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | SetStatusType
    | SetErrorType
    | ReturnType<typeof changeTaskStatusAC>