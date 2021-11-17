import { call, takeLeading, put } from "redux-saga/effects";
import Axios from "axios";
import { fetchData } from "../stores/reducers/todo";
import { sagaActions } from "../stores/actions/saga";

let callAPI = async ({ url, method, data }) => {
    return await Axios({
        url,
        method,
        data
    });
};

export function* fetchDataSaga() {
    try {
        let result = yield call(() =>
            callAPI({ url: "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list" })
        );
        result = result?.data?.map(data => ({
            oriId: data.id,
            id: `item-${data.id}`,
            name: data.title,
            description: data.description,
            createdAt: data.createdAt,
            status: data.status

        }))
        yield put(fetchData(result));
    } catch (e) {
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}

export default function* rootSaga() {
    yield takeLeading(sagaActions.FETCH_DATA_SAGA, fetchDataSaga);
}
