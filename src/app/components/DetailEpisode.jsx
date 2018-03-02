import React, { Component } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class DetailEpisode extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeClick = this.handleChangeClick.bind(this);
    this.handleChangeEpisode = this.handleChangeEpisode.bind(this);
    this.handleChangeScore = this.handleChangeScore.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state={
      id:this.props.match.params.id,
      episode: {},
      isClicked: false
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
handleChangeClick() {
  this.setState({isClicked: true})
}

handleChangeEpisode (event) {
  var newEp = {
    id: this.state.episode.id,
    name: this.state.episode.name,
    code: event.target.value,
    note : this.state.episode.note
  }
    this.setState({episode: newEp})
    console.log(this.state.episode);
};

handleChangeScore (event) {
  var newEp = {
    id: this.state.episode.id,
    name: this.state.episode.name,
    code: this.state.episode.code,
    note : event.target.value
  }
  this.setState({episode: newEp})
  console.log(this.state.episode);
};

handleSubmit(){
  event.preventDefault();

  fetch('/api/episodes' + this.props.match.params.id, {
    method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.props.episode)
  })
      .then((response) => {
              history.push(`/${this.props.episode.id}`);
      })
      .catch((error) => {
          console.error(error);
          window.location.reload();
      });
}

// handleChange(event){
//   var target = event.target;
//   var name = target.name;
//   var value = target.value;
//
//
//   var newEp = {
//     id: this.state.episode.id,
//     name: this.state.episode.name,
//     code: this.state.episode.code,
//     [name] : value
//   }
//   this.setState({episode: newEp});
//   console.log(this.state.episode);
// }


  render() {
    // const inputWhenClicked = this.state.isClicked ? <input type="text" className="form-control" name='code' id="episodeCode" aria-describedby="tvShowName"/> : null

    const isClicked = this.state.isClicked;
    let codeEp = null;
    let scoreEp = null;
    let saveEditButon = null;


    if (isClicked) {
      codeEp = <td><input type="text" className="form-control" name='code' id="episodeCode" aria-describedby="tvShowName"  value={this.state.episode.code} onChange={this.handleChangeEpisode} /></td>
      scoreEp = <td><input type="text" className="form-control" name='note' id="episodeScore" aria-describedby="tvShowScore" value={this.state.episode.note} onChange={this.handleChangeScore}/></td>
      saveEditButon = <button type="button" className="btn btn-basic btn-block" onClick={this.handleSubmit}>Save</button>

    }else{
      codeEp = <td className="text-center">{this.state.episode.code}</td>
      scoreEp = <td className="text-center">{this.state.episode.note}</td>
      saveEditButon = <button type="button" className="btn btn-basic btn-block" onClick={this.handleChangeClick}>Edit</button>
    }

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
              <th className="text-center">Episode:</th>
              {codeEp}
            </tr>
            <tr>
              <th className="text-center">Score:</th>
              {scoreEp}
            </tr>
            <tr>
              <th colSpan={2} className="text-center">
              {saveEditButon}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default DetailEpisode;
