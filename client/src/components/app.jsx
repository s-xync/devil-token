import React, { Component } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import DevilToken from '../contracts/DevilToken.json';
import NavMet from './navmet.jsx';
import DetWall from './detwall.jsx';
import DetSend from './detsend.jsx';
//the contracts folder in the src folder is a symlink
//to the original build/contracts in the truffle project

class App extends Component{
  constructor(props){
    super(props);
    this.state =
    {
      accountAddress:null,
      accountBalance:0,
      networkName:null,
      tokenAddress:null,
      tokenSymbol:null,
      tokenDecimals:0
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
    this.setupAccountDetails = this.setupAccountDetails.bind(this)
    this.setupTokenAndNetworkDetails = this.setupTokenAndNetworkDetails.bind(this)
    // this.watchEvents = this.watchEvents.bind(this)
  }//constructor ends

  setupAccountDetails(){
    if(this.isWeb3){
      if(!this.isWeb3Locked){
        this.web3.eth.getCoinbase((err,accountAddress)=>{
          this.devilToken.deployed().then((instance)=>{
            instance.balanceOf(accountAddress).then((accountBalance)=>{
              this.setState({accountAddress:accountAddress,accountBalance:accountBalance.toNumber()});
            });
          });
        });
      }
    }
  }//setupAccountDetails ends

  setupTokenAndNetworkDetails(){
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
        this.setState({networkName:networkName});
      });
      if(!this.isWeb3Locked){
        this.devilToken.deployed().then((instance)=>{
          instance.symbol().then((symbol)=>this.setState({tokenSymbol:symbol}));
          instance.decimals().then((decimals)=>this.setState({tokenDecimals:decimals.toNumber()}));
          return instance.address;
        }).then((tokenAddress)=>this.setState({tokenAddress:tokenAddress}));
      }
    }
  }//setupTokenAndNetworkDetails ends

  componentDidMount(){
    console.log("hre");
    this.setupAccountDetails();
    this.setupTokenAndNetworkDetails();
  }//componentDidMount ends

  render(){
    console.log(this.state);
    if(this.isWeb3 && !this.isWeb3Locked){
      // web3 is available and also the wallet is unlocked
      if(this.props.type==="wallet"){
        // nav, details, wallet
        return(
          <DetWall accountAddress={this.state.accountAddress} accountBalance={this.state.accountBalance} tokenSymbol={this.state.tokenSymbol} networkName={this.state.networkName} tokenAddress={this.state.tokenAddress}/>
        );
      }else if(this.props.type==="send"){
        // nav, details, send
        return(
          <DetSend accountAddress={this.state.accountAddress} accountBalance={this.state.accountBalance} tokenSymbol={this.state.tokenSymbol} networkName={this.state.networkName} tokenAddress={this.state.tokenAddress}/>
        );
      }
    }else if(this.isWeb3 && this.isWeb3Locked){
      // web3 is available but the wallet is locked
      return(
        <NavMet reason="web3locked"/>
      );
    }else if(!this.isWeb3){
      // web3 is not available
      return(
        <NavMet reason="web3"/>
      );
    }
  }//render ends
}

export default App;
