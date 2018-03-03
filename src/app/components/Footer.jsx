import React, { PropTypes } from 'react';

class Footer extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className=" footer card-footer text-muted navbar-fixed-bottom">
          <div className="text-center">
          	<p>Copyright © 2018 All rights reserved</p>
          </div>
       </div>
    );
  }
}
export default Footer;
