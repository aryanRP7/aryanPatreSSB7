// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import TAT from './components/TAT';
import ShowTAT from './components/ShowTAT';
import ShowWAT from './components/ShowWAT';
import WAT from './components/WAT'; // Import WAT component
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/tat" component={TAT} />
          <Route path="/showtat" component={ShowTAT} />
          <Route path="/showwat" component={ShowWAT} />
          <Route path="/wat" component={WAT} /> {/* Add route for WAT component */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
