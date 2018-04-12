import axios from 'axios'
import { AUTHENTICATE, FETCH_USER, LOGOUT_USER, UPDATE_USERNAME } from '../constants/user'

export const authenticate = () => async dispatch => {
  const res = await axios.get('/api/auth')

  if (res.data) {
    localStorage.setItem("loggedIn", true)
    dispatch({ type: AUTHENTICATE, payload: true })
  } else {
    dispatch({ type: AUTHENTICATE, payload: false })
  }
}

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/user_data')
  dispatch({ type: FETCH_USER, payload: res.data })
  if (res.data != null) dispatch({ type: UPDATE_USERNAME, payload: res.data.username })
}

export const logoutUser = history => dispatch => {
  localStorage.clear()
  axios.get('/api/logout')
  dispatch({ type: AUTHENTICATE, payload: false })
  dispatch({ type: LOGOUT_USER })
  history.push('/')
}

export const updateUsername = username => dispatch => {
  dispatch({ type: UPDATE_USERNAME, payload: username })
}
