import React, { Component } from 'react';

import ItemEpisode from './ItemEpisode';

class ListEpisodes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {episodes: []};
  }

  componentWillMount() {
    fetch('/api/episodes', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      return response.json();
    }).then((episodes) => {
      this.setState({episodes: episodes});
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    const elements = this.state.episodes.map((episode) => {
      return(<ItemEpisode name={episode.name} code={episode.code} note={episode.note} id={episode.id} key={episode.id} />)
    });
    return (
      <div  className="row-fluid">
      <h2 className="text-center">Episode list</h2>
      <div className="listEpContent">
        <table className="table">
          <thead>
            <tr>
              <th>Tv show</th>
              <th>Episode</th>
              <th>Score</th>
              <th>Delete</th>
              <th>Details/Edit</th>
            </tr>
          </thead>
          <tbody>
            {elements}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}
export default ListEpisodes;
