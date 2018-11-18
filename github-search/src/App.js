import React, { Component, Fragment } from 'react';
import { Router, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Project from './components/Project';

var hist = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={hist}>
          <Fragment>
            <Route exact path='/' component={LogIn} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/projects' component={Project} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;