import React, { Component } from 'react';
import Transaction from './transaction.jsx'

class TransactionsTable extends Component{
  render(){
    return(
      <React.Fragment>
        <div className="jumbotron text-center" style={{width:'1140px',paddingTop:'16px',paddingBottom:'8px',margin:'0px'}}>
          <h4>Transactions</h4>
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Time</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Value</th>
                <th scope="col">EtherScan</th>
              </tr>
            </thead>
            <tbody>
              {this.props.transactions.map((transaction)=><Transaction key={transaction.etherScanURL} transaction={transaction} />)}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default TransactionsTable;
