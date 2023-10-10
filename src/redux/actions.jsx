import { createAsyncThunk } from "@reduxjs/toolkit";

// export const getCurrent = createAsyncThunk('user/current', async (data, { rejectWithValue }) => {
//     const response = await apiGetCurrent()
//     if (!response.success) return rejectWithValue(response)
//     return response
// })
// export const getRoles = createAsyncThunk('app/roles', async (data, { rejectWithValue }) => {
//     const response = await apiGetRoles()
//     if (!response.success) return rejectWithValue(response)
//     return JSON.parse(atob(response.rs)) || []
// })
