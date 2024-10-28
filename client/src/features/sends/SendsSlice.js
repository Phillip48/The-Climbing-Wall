import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import sendService from './sendsService'

const initialState = {
  sends: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new send
export const createSend = createAsyncThunk(
  'sends/create',
  async (sendData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await sendService.createSend(sendData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user sends
export const getSends= createAsyncThunk(
  'sends/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await sendService.getSends(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user sends
export const getSendByDate = createAsyncThunk(
  'sends/getByDate',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await sendService.getSendByDate(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user sends
export const deleteSend = createAsyncThunk(
  'sends/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await sendService.deleteSend(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user sends
export const updateSend = createAsyncThunk(
  'sends/update',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await sendService.updateSend(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const sendSlice = createSlice({
  name: 'send',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSend.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSend.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sends.push(action.payload)
      })
      .addCase(createSend.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // 
      .addCase(getSends.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSends.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sends = action.payload
      })
      .addCase(getSends.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // 
      .addCase(getSendByDate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSendByDate.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sends = action.payload
      })
      .addCase(getSendByDate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // 
      .addCase(deleteSend.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSend.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sends = state.sends.filter(
          (send) => send._id !== action.payload.id
        )
      })
      .addCase(deleteSend.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // 
      .addCase(updateSend.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSend.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.sends = state.sends.filter(
          (send) => send._id !== action.payload.id
        )
      })
      .addCase(updateSend.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = sendSlice.actions
export default sendSlice.reducer
