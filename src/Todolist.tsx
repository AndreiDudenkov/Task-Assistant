import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {isNumberObject} from 'util/types';
import {Buttoon} from './components/Button';
import {ALL} from 'dns';

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
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [newTitle, setNewTitle] = useState('')

    const changeFilterHandler = (title: FilterValuesType) => {
    props.changeFilter(title)
    }

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
       if (e.key === 'Enter'){
           addTaskHandler()
       }

    }

    const removeTaskHandler = (tID: string) => {

        props.removeTask(tID)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                type={'text'}
                value={newTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
            />
            <Buttoon name={'+'} callback={addTaskHandler}/>

            {/*<button onClick={addTaskHandler}>+</button>*/}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                        // const removeTaskHandler = () => {
                        //     props.removeTask(t.id)
                        // }

                        return (<li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            {/*<button onClick={()=>removeTaskHandler(t.id)}>x</button>*/}
                            <Buttoon name={'x'} callback={()=>removeTaskHandler(t.id)}/>

                        </li>)
                    }
                )

            }
        </ul>
        <div>
            <Buttoon name={'All'} callback={()=>changeFilterHandler('all')}/>
            <Buttoon name={'Active'} callback={()=>changeFilterHandler('active')}/>
            <Buttoon name={'Completed'} callback={()=>changeFilterHandler('completed')}/>
            {/*<button onClick={() => {props.changeFilter('all')}}>All</button>*/}
            {/*<button onClick={() => {props.changeFilter('active')}}>Active</button>*/}
            {/*<button onClick={() => {props.changeFilter('completed')}}>Completed</button>*/}
        </div>
    </div>
}
