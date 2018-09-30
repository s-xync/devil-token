import React, { Component } from 'react';
import Navbar from './navbar.jsx';
import Details from './details.jsx';
import Wallet from './wallet.jsx';

class DetWall extends Component{
  render(){
    return(
      <React.Fragment>
        <Navbar walletStatus="active" sendStatus=""/>
        <div className="container">
          <br></br>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Details accountAddress={this.props.accountAddress} accountBalance={this.props.accountBalance} tokenSymbol={this.props.tokenSymbol} networkName={this.props.networkName} tokenAddress={this.props.tokenAddress}/>
            </div>
            <div className="col-md-3"></div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <Wallet transactions={this.props.transactions}/>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }//render ends
}

export default DetWall;
