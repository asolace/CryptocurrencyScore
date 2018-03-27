import { combineReducers } from 'redux'
import coinReducer from './coinReducer'
import userReducer from './userReducer'
import userNavReducer from './userNavReducer'

export default combineReducers({
  coins: coinReducer,
  user: userReducer,
  userNav: userNavReducer
})
