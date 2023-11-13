import { apiGetProvinces } from "@/apis/app"
import { apiGetCurrent } from "@/apis/user"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getCurrent = createAsyncThunk(
  "user/current",
  async (data, { rejectWithValue }) => {
    const response = await apiGetCurrent()
    if (!response) return rejectWithValue(response)
    return response
  }
)
export const getProvinces = createAsyncThunk(
  "app/provinces",
  async (data, { rejectWithValue }) => {
    const response = await apiGetProvinces()
    if (!response.status === 200) return rejectWithValue(response)
    return response.data || []
  }
)
