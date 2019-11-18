import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import Header from './components/LandingPage/Header';
import Activity from './components/CreateActivity';


const BaseRouter = () => (
    <div>
      <Switch>
        <Route exact path="/login" component={LoginForm}/>
        <Route exact path='/registro' component={RegisterForm}/>
        <Route exact path='/index' component={Header}/>
        <PrivateRoute path="/" component={Home}/>
      </Switch>
  </div>
);

export default BaseRouter;