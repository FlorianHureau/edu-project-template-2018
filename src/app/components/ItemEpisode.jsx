import React, { PropTypes } from 'react';

class ItemEpisode extends React.Component {

  constructor() {
    super();
    this.deleteEpisode = this.deleteEpisode.bind(this);
  }


deleteEpisode(){
  fetch("/api/episodes/" + this.props.id, {
    method: "DELETE"
  }).then((response) => {
    window.location.reload();
  }).catch((error) => {
      console.error(error);
      window.location.reload();
  });
}

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.code}</td>
        <td>{this.props.note}</td>
        <td>
          <button type="button" className="btn btn-danger" onClick={this.deleteEpisode} >
            <span className="glyphicon glyphicon-trash"></span>
          </button>
        </td>
        <td>
          <button type="button" className="btn btn-primary" ><a className="glyphicon glyphicon-edit" href={this.props.id}></a>
          </button>
        </td>
      </tr>
    );
  }
}
export default ItemEpisode;
