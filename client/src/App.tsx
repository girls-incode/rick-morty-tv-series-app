import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Characters from './components/Characters/Characters';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import store from './state/store';
import { PrivateRoute } from './utils/PrivateRoute';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <h1>Rick and Morty Characters</h1>
      <Router>
        <Switch>
          <PrivateRoute exact component={Characters} path='/' />
          <Route exact component={Login} path='/login' />
          <Route exact component={Register} path='/register' />
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;