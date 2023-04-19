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
    checkboxChange: (taskCbId: string, newIsDone: boolean) => void

}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    let [userError, setUserError] = useState<string | null>(null)
    let [activeBtn, setActiveBtn]= useState<FilterValuesType>('all')


    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle('');
            setUserError(null)
        } else {
            setUserError('Wrong task')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }


    const onAllClickHandler = () =>{
        setActiveBtn('all')
     props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        setActiveBtn('active')
        props.changeFilter('active')
    };
    const onCompletedClickHandler = () => {
        setActiveBtn('completed')
        props.changeFilter('completed')
    };

    const changeIsDoneHandler = (taskCbId: string, newIsDone:boolean) => {
        props.checkboxChange(taskCbId, newIsDone)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   className={userError ? 'error' : ''}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        {userError && <div className={'error-message'}>{userError}</div>}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    // const changeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     props.checkboxChange(t.id, e.currentTarget.checked)
                    // }
                    return <li key={t.id} className={ t.isDone? 'is-done': ''}>
                        <input type="checkbox" onChange={(e)=>changeIsDoneHandler(t.id, e.currentTarget.checked)} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={activeBtn === 'all' ? 'active-filter':''} onClick={onAllClickHandler}>All</button>
            <button className={activeBtn === 'active' ? 'active-filter':''} onClick={onActiveClickHandler}>Active</button>
            <button className={activeBtn === 'completed' ? 'active-filter':''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
