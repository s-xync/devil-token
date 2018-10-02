import React, { Component } from 'react';
import Navbar from './navbar.jsx';
import Details from './details.jsx';
import Transfer from './transfer.jsx';

class DetSend extends Component{
  render(){
    return(
      <React.Fragment>
        <Navbar walletStatus="" sendStatus="active" tokenSymbol={this.props.tokenSymbol} tokenName={this.props.tokenName}/>
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
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <Transfer accountAddress={this.props.accountAddress} accountBalance={this.props.accountBalance} tokenSymbol={this.props.tokenSymbol} tokenDecimals={this.props.tokenDecimals} tokenizeEverything={this.props.tokenizeEverything}/>
              </div>
              <div className="col-md-2"></div>
            </div>
        </div>
      </React.Fragment>
    );
  }//render ends
}

export default DetSend;
