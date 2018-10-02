import React, { Component } from 'react';
import Transaction from './transaction.jsx';

class TransactionsTable extends Component{
  render(){
    return(
      <React.Fragment>
        <div className="jumbotron text-center" style={{width:'1140px',paddingTop:'16px',paddingBottom:'16px'}}>
          <h4>Transactions</h4>
          <hr className="my-2"/>
          <div className="row">
            <div className="col-md-2"><h5><b>Time</b></h5></div>
            <div className="col-md-3"><h5><b>From</b></h5></div>
            <div className="col-md-3"><h5><b>To</b></h5></div>
            <div className="col-md-2"><h5><b>Value</b></h5></div>
            <div className="col-md-2"><h5><b>EtherScan</b></h5></div>
          </div>
          <hr className="my-2"/>
          <div>
            {this.props.transactions.map((transaction)=>
              <Transaction key={transaction.trxnHash} transaction={transaction} tokenSymbol={this.props.tokenSymbol} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }//render ends
}

export default TransactionsTable;
