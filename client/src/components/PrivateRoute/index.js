import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: User, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('loggedIn') === 'true'
      ? <User {...props} />
      : <Redirect to='/' />
  )} />
)

export default PrivateRoute
