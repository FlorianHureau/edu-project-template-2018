import React, { Component } from 'react';

class DetailEpisode extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      id:this.props.match.params.id,
      episode: {}
    };
  }

  componentDidMount() {
    fetch('/api/episodes/' + this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      return response.json();
    }).then((episode) => {
      this.setState({ episode: episode });
    }).catch((error) => {
      console.error(error);
    });
}

  render() {
    return (
      <div className="row col-sm-2 col-sm-offset-5 justify-content-md-center">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th colSpan={2} className="text-center">{this.state.episode.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">Episode:</td>
              <td className="text-center">{this.state.episode.code}</td>
            </tr>
            <tr>
              <td className="text-center">Score:</td>
              <td className="text-center">{this.state.episode.note}</td>
            </tr>
            <tr>
              <th colSpan={2} className="text-center"></th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default DetailEpisode;
