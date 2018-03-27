import { NAV_PROFILE, NAV_COIN } from '../constants/userNav'

export const renderContent = item => dispatch => {
  switch (item) {
    case 'profile':
      dispatch({ type: NAV_PROFILE })
      break
    case 'coins-rated':
      dispatch({ type: NAV_COIN })
      break
    default:
      dispatch({ type: NAV_COIN })
  }
}
