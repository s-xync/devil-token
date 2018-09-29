import React, { Component } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import DevilToken from '../contracts/DevilToken.json';
import Navbar from './navbar.jsx';
import MetamaskComponent from './metamask.jsx'


class App extends Component{
  constructor(props) {
    super(props)
    this.state =
    {
      account:null,
      balance:0,
      network:0
    };

    this.isWeb3=true;
    this.isWeb3Locked=false;

    const web3= window.web3;
    if (typeof web3 !== 'undefined') {
      this.web3Provider = web3.currentProvider;
      this.web3 = new Web3(web3.currentProvider);
      this.devilToken = TruffleContract(DevilToken);
      this.devilToken.setProvider(this.web3Provider);
      if (web3.eth.coinbase === null) this.isWeb3Locked = true;
    }else{
      this.isWeb3 = false;
    }
  }



  componentDidMount(){
    if(this.isWeb3){
      this.web3.version.getNetwork((err,networkId)=>{
        let networkName;
        switch (networkId) {
          case "1":
          networkName = "Main";
          break;
          case "2":
          networkName = "Morden";
          break;
          case "3":
          networkName = "Ropsten";
          break;
          case "4":
          networkName = "Rinkeby";
          break;
          case "42":
          networkName = "Kovan";
          break;
          default:
          networkName = networkId.toString();
        }
        this.setState({network:networkName})
        if(!this.isWeb3Locked){
          this.web3.eth.getCoinbase((err,account)=>{
            this.devilToken.deployed().then((instance)=>{
              instance.balanceOf(account).then(balance=>this.setState({account:account,balance:balance.toNumber()}));
            });
          });
        }
      });
    }
  }

  render(){
    console.log(this.props.type);
    console.log(this.state);
    console.log(this.isWeb3);
    console.log(this.isWeb3Locked);
    if(this.isWeb3 && !this.isWeb3Locked){
    // web3 is available and also the wallet is unlocked
    return(
    <React.Fragment>
    <Navbar walletStatus="" sendStatus=""></Navbar>
    <div className="container">
    <h1>Hi</h1>
    <p>{this.state.account}</p>
    <p>{this.state.balance}</p>
    </div>
    </React.Fragment>
    );
    }else if(this.isWeb3 && this.isWeb3Locked){
    // web3 is available but the wallet is locked
    return(
      <React.Fragment>
        <Navbar walletStatus="disabled" sendStatus="disabled"></Navbar>
        <br></br>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <MetamaskComponent reason="web3locked"></MetamaskComponent>
          </div>
          <div className="col-md-3"></div>
        </div>
      </React.Fragment>
    );
    }else if(!this.isWeb3){
    // web3 is not available
    return(
      <React.Fragment>
        <Navbar walletStatus="disabled" sendStatus="disabled"></Navbar>
        <br></br>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <MetamaskComponent reason="web3"></MetamaskComponent>
          </div>
          <div className="col-md-3"></div>
        </div>
      </React.Fragment>
    );
    }
  }
}
export default App;
