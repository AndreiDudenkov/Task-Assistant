import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {networkInterfaces} from "os";


function App() {

    let [tasks1, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks1.filter(el => el.id != taskId))
    }

    let [sortValue, setSortValue] = useState('All')

    const sort = (btnsortname: string) => {
        setSortValue(btnsortname)
    }


    let filteredTasks = tasks1
    if (sortValue === 'Active') {
        filteredTasks = tasks1.filter(el => !el.isDone)
    }
    if (sortValue === 'Completed') {
        filteredTasks = tasks1.filter(el => el.isDone)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                removeTask={removeTask}
                sort={sort}
            />

        </div>
    );
}

export default App;
