import axios from 'axios'
import { FETCH_COINS } from '../constants/coin'

export const fetchCoins = (page, userId) => async dispatch => {
  const res = await axios.get('/api/coin/list/' + page)
console.log(res)
  dispatch({ type: FETCH_COINS, payload: res.data.coins })
  return { fetching: false }
}
