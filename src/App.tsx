import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistType = { id: string, title: string, filter: FilterValuesType }


type InTaskType = {
    data: TaskType[]
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: InTaskType
}

export const App = () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: 'HTML&CSS1111', isDone: true},
                {id: v1(), title: 'JS1111', isDone: true}
            ],
            filter: 'all'
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: 'HTML&CSS22222', isDone: true},
                {id: v1(), title: 'JS2222', isDone: true}
            ],
            filter: 'all'
        }
    });

    // console.log(tasks[todolistId1].data)


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.filter(el => el.id !== taskId)}
        })
    }
    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({
            ...tasks,
            [todolistId]: {...tasks[todolistId], data: [newTask, ...tasks[todolistId].data]}
        })
    }
    const changeStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId], data: [
                    ...tasks[todolistId].data.map(el =>
                        el.id === taskId ? {...el, isDone: newIsDone} : el)
                ]
            }
        })
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId], data: [
                    ...tasks[todolistId].data.map(el =>
                        el.id === taskId ? {...el, title: newTitle} : el)
                ]
            }
        })
    }


    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTasks({
            ...tasks,
            [todolistId]: {...tasks[todolistId], filter: value}
        })
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId? {...tl,title:newTitle}:tl))
    }
     
    const addTodolist = (title: string) => {
        const newTodo: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }

        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [newTodo.id]:{...tasks[newTodo.id], data:[]} })
    }

    const todoListComponents = todolists.map((el) => {
            let tasksForTodolist = tasks[el.id].data;
            if (tasks[el.id].filter === 'active') {
                tasksForTodolist = tasks[el.id].data.filter(t => t.isDone === false);
            }
            if (tasks[el.id].filter === 'completed') {
                tasksForTodolist = tasks[el.id].data.filter(t => t.isDone === true);
            }
            return (
                <Todolist
                    key={el.id}
                    todolistId={el.id}
                    title={el.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tasks[el.id].filter}
                    removeTodolist={removeTodolist}
                />
            )
        })



    return (
        <div className="App">
            {todoListComponents}
            <AddItemForm addItem={addTodolist} maxTitleLength={20} recommendedTitleLength={10}/>

        </div>
    )
}

