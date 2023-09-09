import {appActions, RequestStatusType} from 'app/app.reducer';
import {handleServerNetworkError} from 'common/utils/handleServerNetworkError';
import {AppThunk} from 'app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTasksAndTodolists} from 'common/actions/common.actions';
import {AddTodolistArg, DeleteTodolistArg, todolistsAPI, TodolistType, updateTodolistArg} from './todolistApi';
import {createAppAsyncThunk, handleServerAppError} from '../../common/utils';


const initialState: TodolistDomainType[] = [];

const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.filter = action.payload.filter;
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.entityStatus = action.payload.entityStatus;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearTasksAndTodolists, () => {
                return [];
            })
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                 return  action.payload.map((tl)=>({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) state.splice(index, 1);
            })
            .addCase (addTodolist.fulfilled, (state, action) => {
                const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'};
                state.unshift(newTodolist);
            })
            .addCase (changeTodolistTitle.fulfilled, (state, action) => {
                const todo = state.find((todo) => todo.id === action.payload.id);
                if (todo) {
                    todo.title = action.payload.title;
                }
            });

    },
});


// thunks

export const fetchTodolists = createAppAsyncThunk<TodolistType[]>
('todo/fetchTodolists', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}));
            const res = await todolistsAPI.getTodolists()
            const todos = res.data
            console.log(res)
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
            return todos
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    }
)

export const removeTodolist = createAppAsyncThunk<{id:string}, DeleteTodolistArg>('todo/removeTodolist',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}));
            const res = await todolistsAPI.deleteTodolist(arg)
            if (res.data.resultCode === 0) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}));
                return {id: arg.id}
            }else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })


export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, AddTodolistArg>('todo/addTodolist',
    async (arg, thunkAPI)=>{
        const {dispatch, rejectWithValue} = thunkAPI
        try{
            dispatch(appActions.setAppStatus({status: 'loading'}));
             const res = await todolistsAPI.createTodolist({title: arg.title})
                dispatch(appActions.setAppStatus({status: 'succeeded'}));
                return {todolist: res.data.data.item}
        }catch (e) {
                handleServerNetworkError(e, dispatch)
                return rejectWithValue(null)
        }
    })

export const changeTodolistTitle = createAppAsyncThunk<{ id: string, title: string },updateTodolistArg>('todo/changeTodolistTitle',
    async (arg, thunkAPI)=>{
        const {dispatch, rejectWithValue} = thunkAPI
        try{
            dispatch(appActions.setAppStatus({status: 'loading'}));
            const res = await todolistsAPI.updateTodolist(arg)
            dispatch(appActions.setAppStatus({status: 'succeeded'}));
                return { id: arg.id, title: arg.title};
        } catch (e) {
                handleServerNetworkError(e, dispatch)
                return rejectWithValue(null)
        }
    }
    )


// export const _changeTodolistTitleTC = (id: string, title: string): AppThunk => {
//     return (dispatch) => {
//         todolistsAPI.updateTodolist(id, title).then((res) => {
//             dispatch(todolistsActions.changeTodolistTitle({id, title}));
//         });
//     };
// };

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};
export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistThunks = {fetchTodolists,removeTodolist,addTodolist,changeTodolistTitle}