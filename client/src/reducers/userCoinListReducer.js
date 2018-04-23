import { FETCH_USER_COIN_LIST } from '../constants/user'

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER_COIN_LIST:
      return action.payload || []
    default:
      return state
  }
}
