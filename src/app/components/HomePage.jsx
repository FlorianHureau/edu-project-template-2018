import React, { PropTypes } from 'react';
import ListEpisodes from './ListEpisodes';
import FormEpisode from './FormEpisode';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <ListEpisodes/>
          </div>
          <div className="col-sm-6">
            <FormEpisode/>
          </div>
        </div>
      </div>
    );
  }
}
export default HomePage;
