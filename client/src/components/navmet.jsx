import React, { Component } from 'react';
import Navbar from './navbar.jsx';
import MetamaskComponent from './metamask.jsx'

class NavMet extends Component{
  <React.Fragment>
    <Navbar walletStatus="disabled" sendStatus="disabled"></Navbar>
    <br></br>
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <MetamaskComponent reason=this.props.reason></MetamaskComponent>
      </div>
      <div className="col-md-3"></div>
    </div>
  </React.Fragment>
}

export default NavMet;
