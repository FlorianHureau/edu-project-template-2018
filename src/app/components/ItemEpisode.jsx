import React, { PropTypes } from 'react';

class ItemEpisode extends React.Component {

  constructor() {
    super();
  }
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.code}</td>
        <td>{this.props.note}</td>
      </tr>
    );
  }
}
export default ItemEpisode;
