import React, { Component } from 'react';

class Details extends Component{
  render(){
    return(
      <React.Fragment>
        <div className="jumbotron">
          <div className="row">
            <div className="col-md-2"><b>Account:</b></div>
            <div className="col-md-10">{this.props.account}</div>
          </div>
          <div className="row">
            <div className="col-md-2"><b>Balance:</b></div>
            <div className="col-md-10">{this.props.balance} <b>DVTK</b></div>
          </div>
          </div>
        </React.Fragment>
      );
    }
  }

  export default Details;
