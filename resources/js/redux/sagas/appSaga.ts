import {persistor} from '@/redux/store';

import {PayloadAction} from '@reduxjs/toolkit';
import {startCase} from 'lodash';
import {toast} from 'react-toastify';
import {delay, put, select} from 'redux-saga/effects';
import {toastMessageSlice} from '@/redux/slices/toastMessageSlice';
import {appSettingSlice} from '@/redux/slices/appSettingSlice';

export function* startResetEnireAppSceanrio() {
    yield put({type: `${appSettingSlice.actions.resetSettings}`});
    // persistor.purge();
}

export function* startShowToastMessageScenario(action: PayloadAction<any>) {
    try {
        const {toastMessage} = yield select();
        toast(startCase(toastMessage.content), {type: toastMessage.type});
        yield delay(2000);
        yield put({type: `${toastMessageSlice.actions.hideToastMessage}`});
    } catch (e) {
    } finally {
    }
}
