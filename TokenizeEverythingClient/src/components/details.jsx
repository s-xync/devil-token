import React, { Component } from 'react';

class Details extends Component{
  render(){
    return(
      <React.Fragment>
        <div className="jumbotron" style={{paddingTop:'16px',paddingBottom:'8px',margin:'0px'}}>
          <div className="row">
            <div className="col-md-3 overflow-text"><b>Account:</b></div>
            <div className="col-md-9 overflow-text">{this.props.accountAddress}</div>
          </div>
          <div className="row">
            <div className="col-md-3 overflow-text"><b>Balance:</b></div>
            <div className="col-md-9 overflow-text">{this.props.accountBalance} {this.props.tokenSymbol}</div>
          </div>
          <hr className="my-3"/>
          <p className="text-center overflow-text"><em><small className="text-muted">{this.props.networkName} : {this.props.tokenAddress}</small></em></p>
        </div>
      </React.Fragment>
    );
  }
}

export default Details;
