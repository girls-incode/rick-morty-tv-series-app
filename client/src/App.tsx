import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import Characters from './components/Characters/Characters';
import CharacterDetails from './components/Characters/CharacterDetails';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import { PrivateRoute } from './utils/PrivateRoute';
import { PublicRoute } from './utils/PublicRoute';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className='app'>
      <ToastProvider autoDismiss placement='bottom-right'>
        <BrowserRouter>
          <Switch>
            <PrivateRoute component={Characters} path='/' exact />
            <PrivateRoute component={CharacterDetails} path='/character/:id' />
            <PublicRoute component={Login} path='/login' />
            <PublicRoute component={Register} path='/register' />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
};

export default App;