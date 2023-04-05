import React, {useState} from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    sort:(btnsortname: string)=>void
}

export function Todolist(props: PropsType) {



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map(el =>
                <li key={el.id}>
                    <button onClick={() => props.removeTask(el.id)}>X</button>
                    <input type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                </li>)}

        </ul>
        <div>
            <button onClick={() => props.sort('All')}>All</button>
            <button onClick={() => props.sort('Active')}>Active</button>
            <button onClick={() => props.sort('Completed')}>Completed</button>
        </div>
    </div>
}
