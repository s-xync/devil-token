import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class Navbar extends Component{
  render(){
    return(
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/"><div className="navbar-brand">DVTK</div></Link>
            <div className="navbar-nav ml-md-auto">
              <Link to="/wallet"><div className={"nav-item nav-link "+this.props.walletStatus}>Wallet</div></Link>
              <Link to="/send"><div className={"nav-item nav-link "+this.props.sendStatus}>Send</div></Link>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}


export default Navbar;
