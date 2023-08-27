import { todolistsAPI, TodolistType } from "api/todolists-api";
import { Dispatch } from "redux";
import { appActions, RequestStatusType } from "app/app-reducer";
import { handleServerNetworkError } from "utils/error-utils";
import { AppThunk } from "app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const slice = createSlice({
    name: "todolist",
    initialState: [] as TodolistDomainType[],
    reducers: {
      removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
        debugger
        const index = state.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      },
      setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
        return action.payload.todolists.map((tl) => ({
          ...tl, filter: "all", entityStatus: "idle"
        }));
      },
      addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
      },
      changeTodolistTitle: (state, action: PayloadAction<{
        id: string,
        title: string
      }>) => {
        const index = state.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) state[index].title = action.payload.title
      },
      changeTodolistFilter: (state, action: PayloadAction<{
        id: string,
        filter: FilterValuesType
      }>) => {
        const index = state.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) state[index].filter = action.payload.filter
      },
      changeTodolistEntityStatus: (state, action: PayloadAction<{
        id: string,
        entityStatus: RequestStatusType
      }>) => {
        const index = state.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) state[index].entityStatus = action.payload.entityStatus
      },
      clearTodolistData: (state, action: PayloadAction<{ todolist: [] }>) => {
        return action.payload.todolist
      },
    }
  }
);

export const todolistActions = slice.actions;
export const todolistReducers = slice.reducer;
export type TodolistInitialState = ReturnType<typeof slice.getInitialState>;

// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(todolistActions.setTodolists({ todolists: res.data }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const removeTodolistTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appActions.setAppStatus({ status: "loading" }));
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    // dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
    dispatch(todolistActions.changeTodolistEntityStatus({id:todolistId, entityStatus: "loading"}));
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(todolistActions.removeTodolist({ id: todolistId }));
      //скажем глобально приложению, что асинхронная операция завершена

      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    });
  };
};
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistActions.addTodolist({todolist: res.data.data.item}));

      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistActions.changeTodolistTitle({id, title} ));
    });
  };
};


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

