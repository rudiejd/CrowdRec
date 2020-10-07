import React, { Component } from 'react';
import './App.css';
import { Home } from './Home';
import { About } from './About';
import { NoMatch } from './Nomatch.js';
import { Navigation } from './components/Navigation';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ModalFooter, Row } from 'react-bootstrap';

// Main class just for rendering the components. Just a shell
class App extends Component {
	render() {
		return (
                <React.Fragment>
                        
                                <Router>
                                        <Navigation />
                                        <main role="main">
                                    
                                                <Switch>
                                                        <Route exact path="/" component={Home} />
                                                        <Route exact path="/about" component={About} />
                                                        <Route component={NoMatch} />
                                                </Switch>
                                                
                                        </main>
                                        <footer className="page-footer w-100 font-small pt-4 text-center navbar fixed-bottom">
                                                Copyright 2020 JD Rudie
                                        </footer>
                                </Router>
                </React.Fragment>
                
        );
        }

}

export default App;
