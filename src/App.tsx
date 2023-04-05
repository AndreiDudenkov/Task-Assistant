import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {networkInterfaces} from "os";


function App() {

    let [tasks1, setTasks] = useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    const removeTask = (taskId:number)=>{
        setTasks(tasks1.filter(el=>el.id !=taskId))
    }
    let filteredTasks = tasks1
    const sort = (btnsortname: string) => {

        if (btnsortname==='Active') {
            filteredTasks = tasks1.filter(el=> !el.isDone)
        }
        if (btnsortname==='Completed') {
            filteredTasks = tasks1.filter(el=> el.isDone)
        }
        if (btnsortname==='All') {
            filteredTasks = tasks1
        }
        return filteredTasks

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
