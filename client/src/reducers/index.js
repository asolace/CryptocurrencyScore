import { combineReducers } from 'redux'
import authReducer from './authReducer'
import coinReducer from './coinReducer'
import userReducer from './userReducer'

export default combineReducers({
  auth: authReducer,
  coins: coinReducer,
  user: userReducer
})
