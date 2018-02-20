
import React, { Component, PropTypes } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';
import ListEpisodes from '../components/ListEpisodes';
const store = configure();

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
                    <Route path="/list" component={ListEpisodes}></Route>
                    <Route path="/new" component={Swag}>
                    </Route>
                  </div>
                </Router>
            </Provider>
        );
    }
};
