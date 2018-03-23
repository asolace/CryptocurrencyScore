import { combineReducers } from 'redux'
import coinReducer from './coinReducer'
import userReducer from './userReducer'

export default combineReducers({
  coins: coinReducer,
  user: userReducer
})
