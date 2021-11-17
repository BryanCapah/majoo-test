import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todo'
import createSagaMiddleware from "redux-saga";
import saga from '../apis'


let sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        todo: todoReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
})

sagaMiddleware.run(saga);

export default store