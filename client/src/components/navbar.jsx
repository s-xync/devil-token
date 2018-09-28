import React, { Component } from 'react';

class Navbar extends Component{
  render(){
    return(
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">DVTK</a>
          <div class="navbar-nav ml-md-auto">
            <a class="nav-item nav-link active" href="/wallet">Wallet</a>
            <a class="nav-item nav-link" href="/send">Send</a>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}


export default Navbar;
