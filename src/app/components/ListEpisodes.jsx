// import ItemEpisode from '../components/ItemEpisode';
import React, { Component } from 'react';

import ItemEpisode from './ItemEpisode';

export default class ListEpisodes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {episodes: []};
  }

  componentWillMount() {
    fetch('/api/episodes', {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((episodes) => {
        console.log(episodes);
        this.setState({episodes: episodes})
    });
  }
  
  render() {
    const elements = this.state.episodes.map((episode) => {
      return(<ItemEpisode name={episode.name} code={episode.code} note={episode.note}/>)
    });
    return (
      <div className="container">
      <h1>Episode list</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Tv show</th>
              <th>Episode</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
              {elements}
          </tbody>
        </table>
      </div>
    );
  }
};
