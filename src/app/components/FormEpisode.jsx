// import ItemEpisode from '../components/ItemEpisode';
import React, { Component } from 'react';

import ItemEpisode from './ItemEpisode';

export default class ListEpisodes extends React.Component {

  constructor(props) {
    super(props);
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
    this.setState({name: event.target.value})
  };
  handleChangeEpisode (event) {
      this.setState({code: event.target.value})
  };
  handleChangeScore (event) {
    this.setState({note: event.target.value})
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
      <div  className="row-fluid">
      		  <h2 className="text-center">Add an episode</h2>
            <div>
      	  	<form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="fromEp">Tv Show</label>
                <input type="text" className="form-control" name='name' id="tvShowName" aria-describedby="tvShowName" placeholder="Enter an tv show name" onChange={this.handleChangeName} />
              </div>
              <div className="form-group">
                <label for="fromEp">Episode</label>
                <input type="text" className="form-control" name='code' id="episodeCode" aria-describedby="tvShowName" placeholder="Enter an episode" onChange={this.handleChangeEpisode}/>
              </div>
              <div className="form-group">
                <label for="fromEp">Score</label>
                <input type="number" className="form-control" name='score' id="episodeScore" aria-describedby="episodeScore" placeholder="Enter a score" onChange={this.handleChangeScore}/>
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
};
