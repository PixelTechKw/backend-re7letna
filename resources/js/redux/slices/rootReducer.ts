import {combineReducers} from '@reduxjs/toolkit';
import {appSettingSlice} from '@/redux/slices/appSettingSlice';
import {apiSlice} from '@/redux/api';
import {toastMessageSlice} from '@/redux/slices/toastMessageSlice';
import {pagesSlice} from './pagesSlice';

export const rootReducer = combineReducers({
    [appSettingSlice.name]: appSettingSlice.reducer,
    [pagesSlice.name]: pagesSlice.reducer,
    [toastMessageSlice.name]: toastMessageSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});
