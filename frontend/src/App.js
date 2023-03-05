import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import UserPage from './components/Profile';

export default function App () {
  return (
    <Router>
      <div>
      <div class="container">
      <div class="row">
        <div class="col-sm">
        </div>
        <div class="col-sm mt-5">
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/userPage'>
            <UserPage />
          </Route>
          <Route path='/'>
            <Login />
          </Route>
        </Switch>
        </div>
        <div class="col-sm">
        </div>
      </div>
    </div>
        
      </div>
    </Router>
  );
}