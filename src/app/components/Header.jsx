import React, { PropTypes } from 'react';

class Header extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-expand-sm navbar-dark bg-faded">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <p className="navbar-brand">Alltvshow</p>
          <div className="collapse navbar-collapse" id="nav-content">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <a className="nav-link" href="/">HOME</a>
              </li>
            </ul>
          </div>
        </nav>
        <h1 className="text-center">Alltvshow</h1>
      </div>
    );
  }
}
export default Header;
