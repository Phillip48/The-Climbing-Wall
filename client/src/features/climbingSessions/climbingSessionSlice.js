import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import climbingSessionService from './climbingSessionService'

// climbingSession
// ClimbingSession

const initialState = {
  climbingSessions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new ClimbingSession
export const createClimbingSession = createAsyncThunk(
  'climbingSessions/create',
  async (climbingSessionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await climbingSessionService.createClimbingSession(climbingSessionData, token)
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

// Get user climbingSessions
export const getClimbingSessions = createAsyncThunk(
  'climbingSessions/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await climbingSessionService.getClimbingSessions(token)
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

// Delete user climbingSession
export const deleteClimbingSession = createAsyncThunk(
  'climbingSessions/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await climbingSessionService.deleteClimbingSession(id, token)
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

// update user climbingSession
export const updateClimbingSession = createAsyncThunk(
  'climbingSessions/update',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await climbingSessionService.updateClimbingSession(id, token)
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

export const climbingSessionSlice = createSlice({
  name: 'climbingSession',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClimbingSession.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createClimbingSession.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.climbingSessions.push(action.payload)
      })
      .addCase(createClimbingSession.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getClimbingSessions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getClimbingSessions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.climbingSessions = action.payload
      })
      .addCase(getClimbingSessions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteClimbingSession.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteClimbingSession.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.climbingSessions = state.climbingSessions.filter(
          (climbingSession) => climbingSession._id !== action.payload.id
        )
      })
      .addCase(deleteClimbingSession.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // 
      .addCase(updateClimbingSession.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateClimbingSession.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.climbingSessions = state.climbingSessions.filter(
          (climbingSession) => climbingSession._id !== action.payload.id
        )
      })
      .addCase(updateClimbingSession.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = climbingSessionSlice.actions
export default climbingSessionSlice.reducer
