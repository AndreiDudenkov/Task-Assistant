import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {triggerAsyncId} from 'async_hooks';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    checkboxChange: (taskCbId: string, newIsDone:boolean)=> void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        if (title.trim()!==''){
        props.addTask(title.trim());
        setTitle("");
        setUserError(false)
    } else {
            setUserError(true)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }
    let [userError,setUserError] = useState(false)

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   className={userError===true ? 'error':''}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
            </div>
            {userError===true ? <div className={'error-message'}>Wrong task</div>:''}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.checkboxChange(t.id, e.currentTarget.checked)
                    }
                    return <li key={t.id}>
                        <input type="checkbox" onChange={changeIsDoneHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={ onAllClickHandler }>All</button>
            <button onClick={ onActiveClickHandler }>Active</button>
            <button onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
