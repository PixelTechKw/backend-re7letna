import {Setting} from '@/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {isNull} from 'lodash';

const initialState: any = {
    mobileMenuOpen: false,
    activePath: 'root',
    deleteModal: {showDeleteModal: false, element: null},
};

export const appSettingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleMobileMenu: (state, action: PayloadAction<void>) => ({
            ...state,
            mobileMenuOpen: !state.mobileMenuOpen,
        }),
        toggleshowDeleteModal: (
            state,
            action: PayloadAction<{name: string; id: number | string} | null>,
        ) => ({
            ...state,
            deleteModal: {
                showDeleteModal: !isNull(action.payload),
                element: action.payload,
            },
        }),
        setSettings: (state, action: PayloadAction<Setting>) => ({
            ...state,
            ...action.payload,
        }),
        setActivePath: (state, action: PayloadAction<string>) => ({
            ...state,
            activePath: action.payload,
        }),
        resetSettings: (state, action: PayloadAction<void>) => ({
            ...initialState,
        }),
        resetEntireApp: (state, action: PayloadAction<void>) => ({
            ...initialState,
        }),
    },
});

export const {
    toggleMobileMenu,
    toggleshowDeleteModal,
    setSettings,
    setActivePath,
    resetEntireApp,
} = appSettingSlice.actions;
