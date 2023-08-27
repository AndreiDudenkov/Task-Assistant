import { tasksReducers } from "features/TodolistsList/tasks-reducer";
import { todolistReducers } from "features/TodolistsList/todolists-reducer";
import { AnyAction, combineReducers } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({ reducer: {
    tasks: tasksReducers,
    todolists: todolistReducers,
    app: appReducer,
    auth: authReducer
  } });
export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  AppRootStateType,
  unknown,
  AnyAction>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

// @ts-ignore
window.store = store;
