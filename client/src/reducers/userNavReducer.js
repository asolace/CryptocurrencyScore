import { NAV_PROFILE, NAV_COIN } from '../constants/userNav'

export default function(state = null, action) {
  switch (action.type) {
    case NAV_PROFILE:
      return 'profile'
    case NAV_COIN:
      return 'coin-rating'
    default:
      return 'profile'
  }
}
