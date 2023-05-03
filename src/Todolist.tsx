import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {


    const addTask = (title: string) => props.addTask(props.todolistId, title);


    const onAllClickHandler = () => props.changeFilter(props.todolistId, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, 'active');
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, 'completed');
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle( props.todolistId, newTitle)
    }


    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <button onClick={removeTodolistHandler}>X</button>

        </h3>
        <div>
            <AddItemForm
                addItem={addTask}
                maxTitleLength={20}
                recommendedTitleLength={10}
            />
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(props.todolistId, t.id, newTitle)
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan
                            title={t.title}
                            classes={t.isDone ? 'task-done' : 'task'}
                            changeTitle={changeTaskTitle}
                        />
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
