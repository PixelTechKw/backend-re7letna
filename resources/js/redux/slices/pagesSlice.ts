import {Page} from '@/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
    mobileMenuOpen: false,
};

export const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        setPages: (state, action: PayloadAction<Page[]>) => ({
            ...action.payload,
        }),
    },
});

export const {setPages} = pagesSlice.actions;
