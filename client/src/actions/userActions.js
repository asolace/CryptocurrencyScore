import axios from 'axios'
import { FETCH_USER } from '../constants/user'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  localStorage.setItem('loggedIn', true)
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const logoutUser = () => dispatch => {
  localStorage.clear()
  axios.get('/api/logout')
  dispatch({ type: FETCH_USER, payload: false })
}
