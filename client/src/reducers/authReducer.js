import { AUTHENTICATE } from '../constants/user'

export default function(state = null, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return action.payload || false
    default:
      return state
  }
}
