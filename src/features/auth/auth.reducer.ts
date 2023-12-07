import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'app/app.reducer';
import {authAPI, LoginParamsType} from 'features/auth/auth.api';
import {clearTasksAndTodolists} from 'common/actions';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from 'common/utils';
import thunk from 'redux-thunk';
import {ResultCode} from '../../common/enums';
import {BaseResponseType} from '../../common/types';

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(initializeApp.fulfilled, (state) => {
                state.isLoggedIn = true
            })
    }
})

export const authReducer = slice.reducer;
export const authActions = slice.actions;


export const login = createAppAsyncThunk<void, LoginParamsType>(
    'auth/login',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            const res = await authAPI.login(arg)
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}));
                return undefined;
            } else {
                const isShowAppError = !res.data.fieldsErrors.length
                handleServerAppError(res.data, dispatch, isShowAppError);
                return rejectWithValue(res.data)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null)
        }
    }
)

export const logout = createAppAsyncThunk<void, void>(
    'auth/logout',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        const res = await authAPI.logout()
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}));
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(clearTasksAndTodolists());
                dispatch(appActions.setAppStatus({status: 'succeeded'}));
                return undefined
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null)
        }
    }
)
export const initializeApp = createAppAsyncThunk<void, void>(
    'auth/initializeApp',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        try {
            const res = await authAPI.me();
            if (res.data.resultCode === ResultCode.Success) {
                return undefined;
            } else {
                return rejectWithValue(null);
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        } finally {
            dispatch(appActions.setAppInitialized({ isInitialized: true }));
        }
    }
);