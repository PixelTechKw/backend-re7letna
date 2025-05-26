import {appSettingSlice} from '@/redux/slices/appSettingSlice';
import {toastMessageSlice} from '@/redux/slices/toastMessageSlice';
import {takeLatest} from 'redux-saga/effects';
import {
    startResetEnireAppSceanrio,
    startShowToastMessageScenario,
} from '@/redux/sagas/appSaga';

export function* triggerResetEntireApp() {
    // yield takeLatest(`resetEntireApp`, startResetEnireAppSceanrio);
    yield takeLatest(
        appSettingSlice.actions.resetEntireApp,
        startResetEnireAppSceanrio,
    );
}

export function* triggerEnableLoading() {
    // yield takeLatest(
    //   `${appLoadingSlice.actions.enableAppLoading}`,
    //   startEnableLoadingScenario
    // );
}

export function* triggerShowToastMessage() {
    yield takeLatest(
        [
            `${toastMessageSlice.actions.showToastMessage}`,
            `${toastMessageSlice.actions.showSuccessToastMessage}`,
            `${toastMessageSlice.actions.showErrorToastMessage}`,
            `${toastMessageSlice.actions.showWarningToastMessage}`,
        ],
        startShowToastMessageScenario,
    );
}
