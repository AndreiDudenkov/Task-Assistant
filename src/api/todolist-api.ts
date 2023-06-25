import axios from 'axios';


const settings = {
    withCredentials: true //add cookie to request
}
const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true //add cookie to request
    }
)

export const todolistApi = {
    getTodoList() {
        return instance.get<TodolistType[]>('todo-lists')
    },

    addTodoList(title: string) {
        return instance.post<ResponseTodolistType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseTodolistType>(`todo-lists/${todolistId}`)
    },
    updateTodoList(todolistId: string, title: string) {
        return instance.put<ResponseTodolistType>(`todo-lists/${todolistId}`, {title})
    }


}

type TodolistType = {
    id: string
    title: string
    addedDate: Date
    order: number
}

type ResponseTodolistType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}



