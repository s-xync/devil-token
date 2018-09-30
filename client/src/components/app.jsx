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
      isWeb3Locked:false,
      accountAddress:null,
      accountBalance:null,
      networkName:null,
      tokenAddress:null,
      tokenSymbol:null,
      tokenDecimals:null,
      sendingTransactionHash:null,
      transactions:{
        //from,to,amount,time
        //from is accountAddress -> amount is negative
        //to is accountAddress -> amount is positive
      }
    };

    this.isWeb3=true;
    //  isWeb3 says if web3 is available
    // isWeb3Locked says if the wallet is locked

    this.latestFirstEvent=false;
    // we always have a latest first event that is always seen by our
    // application and we need to discard it as it may have happened long ago.
    // TODO: https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    const web3= window.web3;
    if (typeof web3 !== 'undefined') {
      this.web3Provider = web3.currentProvider;
      this.web3 = new Web3(web3.currentProvider);
      this.devilToken = TruffleContract(DevilToken);
      this.devilToken.setProvider(this.web3Provider);
    }else{
      this.isWeb3 = false;
    }

    this.setupAccountDetails = this.setupAccountDetails.bind(this)
    this.setupTokenAndNetworkDetails = this.setupTokenAndNetworkDetails.bind(this)
    this.watchTokenTransferEvents = this.watchTokenTransferEvents.bind(this)
  }//constructor ends

  watchTokenTransferEvents() {
    //https://medium.com/pixelpoint/track-blockchain-transactions-like-a-boss-with-web3-js-c149045ca9bf

    if(this.isWeb3 && !this.state.isWeb3Locked){
      //the filter does not seem to work and so, we have to do our own filtering ):
      this.devilToken.deployed().then((instance)=>{
        instance.Transfer({},{
          fromBlock:'latest',
          toBlock:'latest'
        }).watch((error,event)=>{
          if(error){
            console.log(error);
          }else{
            if(this.latestFirstEvent){
              if(event.args.to===this.state.accountAddress){
                console.log("to");
              }else if(event.args.from===this.state.accountAddress){
                console.log("from");
              }else{
                console.log("someone");
              }
            }else{
              this.latestFirstEvent=true;
            }
          }
        });
      });
    }
  }
  
  setupAccountDetails(){
    if(this.isWeb3){
      this.web3.eth.getCoinbase((err,accountAddress)=>{
        if(accountAddress){
          this.setState({accountAddress:accountAddress});
          this.devilToken.deployed().then((instance)=>{
            instance.balanceOf(accountAddress).then((accountBalance)=>{
              this.setState({accountBalance:accountBalance.toNumber()});
            });
          });
        }else{
          this.setState({isWeb3Locked:true});
        }
      });
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
      this.devilToken.deployed().then((instance)=>{
        instance.symbol().then((tokenSymbol)=>this.setState({tokenSymbol:tokenSymbol}));
        instance.decimals().then((tokenDecimalsBigNumber)=>this.setState({tokenDecimals:tokenDecimalsBigNumber.toNumber()}));
        return instance.address;
      }).then((tokenAddress)=>this.setState({tokenAddress:tokenAddress}));
    }
  }//setupTokenAndNetworkDetails ends

  componentDidMount(){
    this.setupAccountDetails();
    this.setupTokenAndNetworkDetails();
    this.watchTokenTransferEvents();
  }//componentDidMount ends

  render(){
    if(this.isWeb3 && !this.state.isWeb3Locked){
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
    }else if(this.isWeb3 && this.state.isWeb3Locked){
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
