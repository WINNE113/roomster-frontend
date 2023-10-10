import { createSlice } from "@reduxjs/toolkit";


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        roles: [],
        isLoading: false,
        isShowModal: false,
        modalContent: null,
    },
    reducers: {
        toggleLoading: (state, action) => {
            state.isLoading = action.payload
        },
        modal: (state, action) => {
            state.isShowModal = action.payload.isShowModal
            state.modalContent = action.payload.modalContent
        }
    },
    extraReducers: (builder) => {
    }
})
export const { toggleLoading, modal } = appSlice.actions

export default appSlice.reducer