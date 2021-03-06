import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('token') != null
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/index', state: { from: props.location } }} />
    )} />
)