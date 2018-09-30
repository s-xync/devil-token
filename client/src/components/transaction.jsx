import React, { Component } from 'react';

class Transaction extends Component{
  render(){
    return(
      <React.Fragment>
        <tr>
          <td>{this.props.transaction.timeString}</td>
          <td>{this.props.transaction.fromAddress}</td>
          <td>{this.props.transaction.toAddress}</td>
          <td className={this.props.transaction.value<0?"table-danger":"table-success"}>{this.props.transaction.value}</td>
          <td><a href={this.props.transaction.etherScanURL} className="btn btn-outline-primary btn-lg" role="button" aria-pressed="true" target="_blank" rel="noopener noreferrer">Details</a></td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Transaction;
