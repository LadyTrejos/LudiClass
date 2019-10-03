import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';

import Home from './components/Home';
import Index from './containers/Index';


const BaseRouter = () => (
    <div>
      <Switch>
        <Route exact path='/index' component={Index}/>
        <PrivateRoute path="/" component={Home}/>
      </Switch>
  </div>
);

export default BaseRouter;