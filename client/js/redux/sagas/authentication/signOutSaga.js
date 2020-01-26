import {
    createAction,
    SIGNOUT_START,
    SIGNOUT_FINISH,
    NOTIFICATION_ERROR
} from "../../actions";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { signOut } from "./../../../api";

const onSuccess = () => createAction(SIGNOUT_FINISH)();
const onFail = (error) => createAction(NOTIFICATION_ERROR)(error);

function* doSignOut({ value: id }) {
    try {
        const response = yield call(signOut, { id });
        yield put(onSuccess(response));
        yield put(push("/"));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* signOutSaga() {
    yield takeEvery(SIGNOUT_START, doSignOut);
}