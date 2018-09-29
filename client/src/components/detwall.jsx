import React, { Component } from 'react';
import Navbar from './navbar.jsx';
import Details from './details.jsx'

class DetWall extends Component{
  render(){
    return(
      <React.Fragment>
        <Navbar walletStatus="active" sendStatus=""></Navbar>
        <div className="container">
          <br></br>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Details account={this.props.account} balance={this.props.balance}/>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }//render ends
}

export default DetWall;
