import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/home/home';
import { EditProfile } from './components/user-profile/edit-profile';
import { OpenTransaction } from './components/transaction/open-transaction';

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
          <Route path="/open-transaction/:id" render={(props) => <OpenTransaction {...props} />}>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
