import React, { Component } from 'react';
import './App.css';
import { Home } from './Home';
import { About } from './About';
import { NoMatch } from './Nomatch.js';
import { Navigation } from './components/Navigation';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';      
import Text from './components/Text'; 

// Main class just for rendering the components. Just a shell
class App extends Component {
	render() {
		return (
                <React.Fragment>
                                <Router basename={`${process.env.PUBLIC_URL}/`}>
                                        <Navigation />
                                        <main role="main">
                                    
                                                <Switch>
                                                        <Route exact path="/" component={Home} />
                                                        <Route exact path="/about" component={About} />
                                                        <Route component={NoMatch} />
                                                </Switch>
                                                
                                        </main>
                                        
                                </Router>
                                <footer>
                                        <Text>
                                                <p class="text-center mt-5">Copyright 2020 JD Rudie</p>
                                        </Text>
                                </footer>
                </React.Fragment>
                
        );
        }

}

export default App;
