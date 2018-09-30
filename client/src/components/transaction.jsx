import React, { Component } from 'react';

class Transaction extends Component{
  render(){
    return(
      <React.Fragment>
        <div className="row">
          <div className="col-md-2">{this.props.transaction.timeString}</div>
          <div className="col-md-3 overflow-text">{this.props.transaction.fromAddress}</div>
          <div className="col-md-3 overflow-text">{this.props.transaction.toAddress}</div>
          <div className={"col-md-2 "+(this.props.transaction.value < 0 ? "text-danger" : "text-success")}>{this.props.transaction.value+" "+this.props.tokenSymbol}</div>
          <div className="col-md-2"><a href={this.props.transaction.etherScanURL} className="btn btn-outline-primary btn-sm" role="button" aria-pressed="true" target="_blank" rel="noopener noreferrer">Details</a></div>
        </div>
        <hr className="my-1"></hr>
      </React.Fragment>
    );
  }//render ends
}

export default Transaction;
