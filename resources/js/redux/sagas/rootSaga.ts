import {
    triggerResetEntireApp,
    triggerShowToastMessage,
} from '@/redux/sagas//triggers';
import {PURGE, REHYDRATE} from 'redux-persist/lib/constants';
import {all, fork, take} from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([fork(triggerShowToastMessage), fork(triggerResetEntireApp)]);
    yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
    yield take(PURGE);
}
