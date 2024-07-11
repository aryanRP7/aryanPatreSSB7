import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; // Use HashRouter instead of BrowserRouter
import Home from './components/Home';
import TAT from './components/TAT';
import ShowTAT from './components/ShowTAT';
import ShowWAT from './components/ShowWAT';
import WAT from './components/WAT';
import Stopwatch from './components/Stopwatch'; // Import the Stopwatch component
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
          <Route path="/wat" component={WAT} />
          <Route path="/stopwatch" component={Stopwatch} /> {/* Add the Stopwatch route */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
