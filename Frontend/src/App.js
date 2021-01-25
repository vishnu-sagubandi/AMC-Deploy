import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Team from './components/pages/Team';
import Projects from './components/pages/Projects';
import Alumni from './components/pages/Alumni';
import Events from './components/pages/Events';
import Resources from './components/pages/Resources';
import ProjectDetails from './components/pages/Project-detail';



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/team' component={Team} />
          <Route path='/projects' component={Projects} />
          <Route path='/alumni' component={Alumni} />
          <Route path='/events' component={Events} />
          <Route path='/resources' component={Resources} />
          
          <Route path='/:productid' component={ProjectDetails} />

        </Switch>
      </Router>
    </>
  );
}

export default App;
