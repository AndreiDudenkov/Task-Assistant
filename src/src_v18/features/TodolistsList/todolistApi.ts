import {BaseResponse} from '../../common/types';
import {instance} from '../../common/api/todolists-api';

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(arg: AddTodolistArg) {
        return instance.post<BaseResponse<{ item: TodolistType }>>('todo-lists',
            {title: arg.title});
    },
    deleteTodolist(arg: DeleteTodolistArg) {
        return instance.delete<BaseResponse>(`todo-lists/${arg.id}`);
    },
    updateTodolist(arg:updateTodolistArg) {
        return instance.put<BaseResponse>(`todo-lists/${arg.id}`, {title: arg.title});
    }
}

// types
export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};
export type DeleteTodolistArg = {
    id: string
};
export type AddTodolistArg = {
    title: string
};
export type updateTodolistArg = {
    id: string,
    title: string
}