import React, { Component } from 'react';

class Navbar extends Component{
  render(){
    return(
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">DVTK</a>
            <div className="navbar-nav ml-md-auto">
              <a className={"nav-item nav-link "+this.props.walletStatus} href="/wallet">Wallet</a>
              <a className={"nav-item nav-link "+this.props.sendStatus} href="/send">Send</a>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}


export default Navbar;
