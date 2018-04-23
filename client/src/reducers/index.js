import { combineReducers } from 'redux'
import coinReducer from './coinReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'
import usernameReducer from './usernameReducer'
import userNavReducer from './userNavReducer'
import userCoinListReducer from './userCoinListReducer'

export default combineReducers({
  coins: coinReducer,
  user: userReducer,
  username: usernameReducer,
  userCoinList: userCoinListReducer,
  userNav: userNavReducer,
  auth: authReducer,
})
