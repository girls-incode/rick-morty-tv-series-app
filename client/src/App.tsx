import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Characters from './components/Characters/Characters';
import CharacterDetails from './components/Characters/CharacterDetails';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import store from './state/store';
import { PrivateRoute } from './utils/PrivateRoute';
import { PublicRoute } from './utils/PublicRoute';
import useToken from './utils/Token';
import { updateUser, userSelector } from './state/userSlice';
import './App.scss';

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <PrivateRoute exact component={Characters} path='/' />
        <PrivateRoute component={CharacterDetails} path='/character/:id' />
        <PublicRoute component={Login} path='/login' />
        <PublicRoute component={Register} path='/register' />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;