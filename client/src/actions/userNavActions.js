import { NAV_PROFILE, NAV_COIN } from '../constants/userNav'

export const renderContent = item => dispatch => {
  console.log(item);
  switch (item) {
    case 'profile':
      dispatch({ type: NAV_PROFILE })
      break
    case 'coin-rating':
      dispatch({ type: NAV_COIN })
      break
    default:
      dispatch({ type: NAV_COIN })
  }
}
