import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Characters from './components/Characters/Characters';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import store from './state/store';
import { PrivateRoute } from './utils/PrivateRoute';
import { PublicRoute } from './utils/PublicRoute';
import useToken from './utils/Token';
import { updateUser, userSelector } from './state/userSlice';

const App: React.FC = () => {
  return (
    <>
      <h1>Rick and Morty Characters</h1>
      <Router>
        <Switch>
          <PrivateRoute exact component={Characters} path='/' />
          <PublicRoute exact component={Login} path='/login' />
          <PublicRoute exact component={Register} path='/register' />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;