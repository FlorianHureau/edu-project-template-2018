
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


// class Yolo extends Component {
//     render() {
//         return(<h1>Hello World szedzedxef!!</h1>);
//     }
// };
class Swag extends Component {
    render() {
        return(<h1>Ce que vous voulez</h1>);
    }
};

// class episode extends Component {
//   render(){
//     return(<h1>dzefezf</h1>);
//   }
// };

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                  <div>
                    <Header/>
                    <div>
                      <Route path="/home" component={HomePage}/>
                      <Route path="/:id" component={DetailEpisode}/>
                    </div>
                    <Footer/>
                  </div>
                </Router>
            </Provider>
        );
    }
};
