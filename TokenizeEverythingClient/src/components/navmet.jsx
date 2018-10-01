import React, { Component } from 'react';
import Navbar from './navbar.jsx';
import MetamaskComponent from './metamask.jsx';

class NavMet extends Component{
  //this.props.reason will give the context
  //web3 --> web3 not available
  //web3locked --> wallet is locked
  render(){
    return(
      <React.Fragment>
        <Navbar walletStatus="disabled" sendStatus="disabled" tokenName={this.props.tokenName} tokenSymbol={this.props.tokenSymbol}/>
        <div className="container">
          <br></br>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <MetamaskComponent reason={this.props.reason}/>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }//render ends
}

export default NavMet;
