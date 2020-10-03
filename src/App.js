import React, { Component } from 'react';
import './App.css';
import { Home } from './Home';
import { About } from './About';
import { Contact } from './Contact';
import { NoMatch } from './Nomatch.js';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Class } from './Class';
import { Student } from './Student';


class App extends Component {
	render() {
		return (
                <React.Fragment>
                        <Router>
                                <Navigation />
                                <Layout>
                                        
                                        <Switch>
                                                <Route exact path="/" component={Home} />
                                                <Route exact path="/about" component={About} />
                                                <Route exact path="/contact" component={Contact} />
                                                <Route exact path="/class" component={Class} />
                                                <Route exact path="/student" component={Student} />
                                                <Route component={NoMatch} />
                                        </Switch>
                                </Layout>
                        </Router>
                </React.Fragment>
        );
        }

}

export default App;
