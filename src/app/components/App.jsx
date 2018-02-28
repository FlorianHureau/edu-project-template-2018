
import React, { Component, PropTypes } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';
const store = configure();
import ListEpisodes from '../components/ListEpisodes';
import HomePage from '../components/HomePage';
import Footer from './Footer';
import Header from './Header';
import DetailEpisode from '../components/DetailEpisode';


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                  <div>
                    <Header/>
                    <div>
                      <Route exact path="/" component={HomePage}/>
                      <Route path="/:id" component={DetailEpisode}/>
                    </div>
                    <Footer/>
                  </div>
                </Router>
            </Provider>
        );
    }
};
