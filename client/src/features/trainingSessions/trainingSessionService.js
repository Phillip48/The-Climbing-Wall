import axios from 'axios'

const API_URL = '/api/training/'

// TrainingSession
// trainingSession

// Create new training Session
const createTrainingSession = async (sendData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + 'trainingsession', sendData, config)

  return response.data
}

// Get user training Sessions
const getTrainingSessions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'trainingsession', config)

  return response.data
}

// Delete user training Session
const deleteTrainingSession = async(trainingSessionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + 'trainingsession/' + trainingSessionId, config)

  return response.data
}

// Update user trainingSession
const updateTrainingSession = async (trainingSessionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  let realId = trainingSessionId.sessionId
  const response = await axios.put(API_URL + 'trainingsession/' + realId, trainingSessionId, config)

  return response.data
}

const trainingSessionService = {
  createTrainingSession,
  getTrainingSessions,
  deleteTrainingSession,
  updateTrainingSession
}

export default trainingSessionService
