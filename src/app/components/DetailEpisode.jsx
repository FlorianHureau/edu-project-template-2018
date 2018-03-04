import React, { Component, PropTypes } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class DetailEpisode extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      id:this.props.match.params.id,
      name:'',
      code:'',
      note: '',
      isClicked: false
    };
    this.handleChangeClick = this.handleChangeClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.setState({ name: episode.name });
      this.setState({code: episode.code});
      this.setState({note: episode.note});
    }).catch((error) => {
      console.error(error);
    });
  }

  handleChangeClick() {
    this.setState({isClicked: true})
  }

  handleChange(event){
    let target = event.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name] : value
    })
  }

  handleSubmit(event){
    event.preventDefault();

    fetch('/api/episodes/' + this.props.match.params.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then(response => {
      return response.json()
    }).then((res) => {
      window.location.reload();
    }).catch((error) => {
      console.error(error);
      window.location.reload();
    });
  }

  render() {
    const isClicked = this.state.isClicked;
    const isEnabled = this.state.code.length > 0 && this.state.note.length > 0 && this.state.note.match('^(?:[1-9]|0[1-9]|10)$') != null;

    let codeEp = null;
    let scoreEp = null;
    let saveEditButon = null;
    let detailEdition = null;

    if (isClicked) {
      codeEp = <td ><input size="1" type="text" className="form-control text-center" name='code'  value={this.state.code} onChange={this.handleChange} required/></td>
      scoreEp = <td><input size="1" type="text" className="form-control text-center" name='note' value={this.state.note} onChange={this.handleChange} required/></td>
      saveEditButon = <button disabled={!isEnabled} type="button" className="btn btn-basic btn-block" onClick={this.handleSubmit}>Save</button>
      detailEdition = <h2 className="text-center">Edition</h2>
    } else {
      codeEp = <td className="text-center">{this.state.code}</td>
      scoreEp = <td className="text-center">{this.state.note}</td>
      saveEditButon = <button type="button" className="btn btn-basic btn-block" onClick={this.handleChangeClick}>Edit</button>
      detailEdition = <h2 className="text-center">Details</h2>
    }

    return (
      <div className="container-fluid detailEditionContent" >
        <div className="col-sm-4 col-sm-offset-4 ">
          {detailEdition}
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th colSpan={2} className="text-center">{this.state.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th  className="text-center">Episode:</th>
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
      </div>
    );
  }
}
export default DetailEpisode;
