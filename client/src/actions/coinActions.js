import axios from 'axios'
import { FETCH_COINS } from '../constants/coin'

export const fetchCoins = page => async dispatch => {
  const res = await axios.get('/api/coin/list/' + page)
  dispatch({ type: FETCH_COINS, payload: res.data.coins })
  return { fetching: false }
}
