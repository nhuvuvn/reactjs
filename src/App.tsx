import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/home/home';
import { EditProfile } from './components/user-profile/edit-profile';

export function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/' exact={true}>
            <Home />
          </Route>
          <Route path="/edit-profile">
            <EditProfile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
