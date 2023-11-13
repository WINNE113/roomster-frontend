import { createSlice } from "@reduxjs/toolkit";
import { getProvinces } from "./actions";


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        roles: [],
        isLoading: false,
        isShowModal: false,
        modalContent: null,
        provinces: []
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
        builder.addCase(getProvinces.fulfilled, (state, action) => {
            state.provinces = action.payload
        })
    }
})
export const { toggleLoading, modal } = appSlice.actions

export default appSlice.reducer