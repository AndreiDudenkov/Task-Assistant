import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistApi} from '../api/todolist-api';

export default {
    title: 'API_Todolist'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistApi.getTodoList().then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // const title = 'TODOLIST_4'
        // todolistApi.addTodoList(title)
        //     .then((res) => {
        //         setState(res.data)
        //     })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // const todolistId = 'e4c4f179-abd9-48b8-a08a-591ebc979b22'
        // todolistApi.deleteTodoList(todolistId)
        //     .then((res) => {
        //         setState(res.data)
        //     })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // const todolistId = '4ca7fc76-13bf-4fd8-b39d-68080f966268'
        // const title = 'TODOLIST_3'
        // todolistApi.updateTodoList(todolistId, title)
        //     .then((res) => {
        //         setState(res.data)
        //     })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

