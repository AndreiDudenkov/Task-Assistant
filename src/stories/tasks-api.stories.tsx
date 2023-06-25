import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistApi} from '../api/todolist-api';
import {taskApi} from '../api/task-api';

export default {
    title: 'API_Task'
}


export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todolistId = 'bcadbc68-183c-4f09-8f77-9ce5cc3cbbc3'

        taskApi.getTask(todolistId).then((res:any) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // const todolistId = 'bcadbc68-183c-4f09-8f77-9ce5cc3cbbc3'
        // const title = 'Task_2_todolist_1'
        // taskApi.addTask(todolistId, title)
        //     .then((res) => {
        //         setState(res.data)
        //     })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // const todolistId = 'bcadbc68-183c-4f09-8f77-9ce5cc3cbbc3'
        // const taskId = '9b079850-d985-4a65-bbeb-c58e3235022c'
        // taskApi.deleteTask(todolistId,taskId)
        //     .then((res) => {
        //         setState(res.data)
        //     })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // const todolistId = 'bcadbc68-183c-4f09-8f77-9ce5cc3cbbc3'
        // const taskId = '3d15aa7c-80a8-4ba3-8b34-ac55d72fad5a'
        // const title = 'Task_2_todolist_1_updated'
        // taskApi.updateTask(todolistId,taskId, title)
        //     .then((res) => {
        //         setState(res.data)
        //     })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

// [
//     {
//         "id": "bcadbc68-183c-4f09-8f77-9ce5cc3cbbc3",
//         "title": "TODOLIST_1",
//         "addedDate": "2023-06-22T18:04:39.577",
//         "order": -5
//     },
//     {
//         "id": "b5b100d4-2236-4b9d-a166-d85c7bf78bc8",
//         "title": "TODOLIST_2",
//         "addedDate": "2023-06-22T17:00:43.9",
//         "order": -1
//     },
//     {
//         "id": "4ca7fc76-13bf-4fd8-b39d-68080f966268",
//         "title": "TODOLIST_3",
//         "addedDate": "2023-06-22T16:47:39.627",
//         "order": 0
//     }
// ]