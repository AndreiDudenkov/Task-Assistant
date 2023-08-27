import {
  todolistActions,
  TodolistDomainType, todolistReducers
} from "./todolists-reducer";
import { tasksReducers, TasksStateType } from "./tasks-reducer";
import { TodolistType } from "api/todolists-api";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: TodolistDomainType[] = [];

  let todolist: TodolistType = {
    title: "new todolist",
    id: "any id",
    addedDate: "",
    order: 0,
  };

  const action = todolistActions.addTodolist({ todolist });

  const endTasksState = tasksReducers(startTasksState, action);
  const endTodolistsState = todolistReducers(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

   expect(idFromTasks).toBe(todolist.id);
  expect(idFromTodolists).toBe(todolist.id);
});
