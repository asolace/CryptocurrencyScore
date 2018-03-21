import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import authReducer from './authReducer'
import coinReducer from './coinReducer'
import userReducer from './userReducer'

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  coins: coinReducer,
  user: userReducer
})
