import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import trainingSessionService from './trainingSessionService'

// TrainingSession

const initialState = {
  trainingSessions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new training Session
export const createTrainingSession = createAsyncThunk(
  'trainingSession/create',
  async (trainingSessionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await trainingSessionService.createTrainingSession(trainingSessionData, token)
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

// Get user training Sessions
export const getTrainingSessions = createAsyncThunk(
  'trainingSession/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await trainingSessionService.getTrainingSessions(token)
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

// Delete user TrainingSession
export const deleteTrainingSession = createAsyncThunk(
  'trainingSession/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await trainingSessionService.deleteTrainingSession(id, token)
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

// update user TrainingSession
export const updateTrainingSession = createAsyncThunk(
  'trainingSession/update',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await trainingSessionService.updateTrainingSession(id, token)
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

export const trainingSessionSlice = createSlice({
  name: 'trainingSession',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTrainingSession.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTrainingSession.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.trainingSessions.push(action.payload)
      })
      .addCase(createTrainingSession.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTrainingSessions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTrainingSessions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.trainingSessions = action.payload
      })
      .addCase(getTrainingSessions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteTrainingSession.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTrainingSession.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.trainingSessions = state.trainingSessions.filter(
          (trainingSession) => trainingSession._id !== action.payload.id
        )
      })
      .addCase(deleteTrainingSession.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // 
      .addCase(updateTrainingSession.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTrainingSession.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.trainingSessions = state.trainingSessions.filter(
          (trainingSession) => trainingSession._id !== action.payload.id
        )
      })
      .addCase(updateTrainingSession.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = trainingSessionSlice.actions
export default trainingSessionSlice.reducer
