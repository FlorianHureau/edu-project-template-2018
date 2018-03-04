import React, { Component } from 'react';
import ItemEpisode from './ItemEpisode';

class ListEpisodes extends React.Component {

  constructor() {
    super();
    this.state = {
    name:'',
    code:'',
    note: ''
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEpisode = this.handleChangeEpisode.bind(this);
    this.handleChangeScore = this.handleChangeScore.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName (event) {
    this.setState({name: event.target.value});
  };
  handleChangeEpisode (event) {
      this.setState({code: event.target.value});
  };
  handleChangeScore (event) {
    this.setState({note: event.target.value});
  };

  handleSubmit(){
    event.preventDefault();
    const episode = {
     name: this.state.name,
     code: this.state.code,
     note: this.state.note
   };
    fetch('/api/episodes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(episode)
    }).then((response) => {
        window.location.reload();
    }).catch((error) => {
        console.error(error);
        window.location.reload();
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Add an episode</h2>
        <div className="formContent">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Tv Show</label>
              <input type="text" className="form-control" name='name' id="tvShowName"  placeholder="Enter a tv show name" onChange={this.handleChangeName} required/>
            </div>
            <div className="form-group">
              <label>Episode</label>
              <input type="text" className="form-control" name='code' id="episodeCode" placeholder="Enter an episode" onChange={this.handleChangeEpisode} required/>
            </div>
            <div className="form-group">
              <label>Score</label>
              <input type="number" className="form-control" name='score' id="episodeScore" placeholder="Enter a score" min="1" max="10" onChange={this.handleChangeScore} required/>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-3 col-sm-6">
                <input className="btn btn-primary col-sm-offset-3 col-sm-6" type="submit" value="save"  />
              </div>
            </div>
          </form>
        </div>
    </div>
    );
  }
}
export default ListEpisodes;
