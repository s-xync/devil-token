import React, { Component } from 'react';

class MetamaskComponent extends Component{
  render(){
    if(this.props.reason==="web3"){
      return(
        <React.Fragment>
          <div className="jumbotron text-center">
            <h1 className="display-6">OOPS!</h1>
            <h3 className="display-5">Could Not Find Web3!</h3>
            <p className="lead">Please install the Metamask Chrome Extension.</p>
            <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
              <img style={{maxWidth:'50%'}} className="img-fluid" src={require('../assets/metamask_install.png')} alt="metamask_install.png"/>
            </a>
            <hr className="my-4"/>
            <p className="lead">You can also open this page from an Ethereum Browser like Mist, Coinbase Wallet, etc. instead.</p>
          </div>
        </React.Fragment>
      );
    }else if(this.props.reason==="web3locked"){
      return(
        <React.Fragment>
          <div className="jumbotron text-center">
            <h1 className="display-6">OOPS!</h1>
            <h3 className="display-5">Could Not Find a Web3 Account!</h3>
            <p className="lead">Please unlock Metamask.</p>
            <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
              <img style={{maxWidth:'20%'}} className="img-fluid" src={require('../assets/metamask_login.png')} alt="metamask_login.png"/>
            </a>
          </div>
        </React.Fragment>
      );
    }
  }//render ends
}

export default MetamaskComponent;
