import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';

import Header from './components/LandingPage/Header';
import Home from './components/Home';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';

const BaseRouter = () => (
    <div>
      <Switch>
        <Route exact path="/iniciar" component={LoginContainer}/>
        <Route exact path="/registro" component={RegisterContainer} />
        <Route exact path='/index' component={Header}/>
        <PrivateRoute path="/" component={Home}/>
      </Switch>
  </div>
);

export default BaseRouter;