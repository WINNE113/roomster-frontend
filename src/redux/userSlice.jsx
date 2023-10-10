import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: null,
        token: null,
        mes: ''
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token
        },
        logout: (state) => {
            state.current = null
            state.token = null
            state.mes = ''
        },
        clearMessage: (state) => {
            state.mes = ''
        }
    },
    extraReducers: (builder) => {
    }
})
export const { login, logout, clearMessage } = userSlice.actions

export default userSlice.reducer