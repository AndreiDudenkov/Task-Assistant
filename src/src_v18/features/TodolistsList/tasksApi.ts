import {BaseResponse} from '../../common/types';
import {UpdateDomainTaskModelType} from './tasks.reducer';
import {TaskPriorities, TaskStatuses} from '../../common/enums/enums';
import {instance} from '../../common/api/todolists-api';

export const taksksAPI = {

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(arg:RemoveTaskArg) {
        return instance.delete< BaseResponse>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
    },
    createTask(arg:AddTaskArg) {
        return instance.post< BaseResponse<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title });
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put< BaseResponse<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
};

export type AddTaskArg={
    title: string,
    todolistId: string
}
export type UpdateTaskArg={
    taskId: string,
    domainModel: UpdateDomainTaskModelType,
    todolistId: string
}

export type RemoveTaskArg={
    taskId: string,
    todolistId: string
}

export type TaskType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};
export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};
type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TaskType[];
};
