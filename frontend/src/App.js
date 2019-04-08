import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/login" exact/>
          <Route path="/login" component={LoginPage} />
          <Route path="/tasks" component={TasksPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
