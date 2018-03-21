let user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, user } : {}

export default function(state = null, action) {
  switch (action.type) {
    default:
      return state
  }
}
