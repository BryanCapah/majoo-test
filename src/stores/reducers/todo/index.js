import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const todo = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        createNewTodo(state, action) {
            state.push(action.payload)
        },
        reorderTodo(state, action) {
            return action.payload
        },
        updateTodo(state, action) {
            const { payload } = action
            return state.map(data => {
                if (data.id === payload.id) data = payload
                return data
            })
        }, deleteTodo(state, action) {
            return state.filter(item => item.oriId !== action.payload)
        },
        fetchData: (state, action) => {
            return action.payload
        }
    },
})

// getter
export const getTodo = state => state?.todo

//setter
export const {
    createNewTodo,
    updateTodo,
    reorderTodo,
    deleteTodo,
    fetchData
} = todo.actions

export default todo.reducer
