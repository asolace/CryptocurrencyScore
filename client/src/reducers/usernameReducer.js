import { UPDATE_USERNAME } from '../constants/user'

export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return action.payload || ''
    default:
      return state
  }
}
