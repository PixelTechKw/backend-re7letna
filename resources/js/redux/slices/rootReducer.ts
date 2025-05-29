import {combineReducers} from '@reduxjs/toolkit';
import {appSettingSlice} from '@/redux/slices/appSettingSlice';
import {apiSlice} from '@/redux/api';
import {toastMessageSlice} from '@/redux/slices/toastMessageSlice';

export const rootReducer = combineReducers({
    [appSettingSlice.name]: appSettingSlice.reducer,
    [toastMessageSlice.name]: toastMessageSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});
