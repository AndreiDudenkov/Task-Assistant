import axios from 'axios';
import {GetTask} from '../stories/tasks-api.stories';


const settings = {
    withCredentials: true //add cookie to request
}
const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true //add cookie to request
    }
)

export const taskApi = {
    getTask(todolistId: string) {
        return instance.get<TasksType[]>(`/todo-lists/${todolistId}/tasks`)
    },

    addTask(todolistId:string, title: string) {
        return instance.post<TasksType>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId:string) {
        return instance.delete<ResponseTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId:string, title:string) {
        return instance.put<ResponseTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }


}

type TasksType = {
    id: string
    title: string
    description: null
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: Date
    deadline: null
    addedDate: Date
}
type ResponseTaskType = {
    resultCode: number
    messages:string[]
    data: {}
}




