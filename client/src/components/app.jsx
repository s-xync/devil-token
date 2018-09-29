import React, { Component } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import DevilToken from '../contracts/DevilToken.json';
import Navbar from './navbar.jsx';


class App extends Component{
  constructor(props) {
    super(props)
    this.state =
    {
      details:{
        account:null,
        balance:0,
        network:0
      }
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
      this.web3.version.getNetwork((err,_networkId)=>{
        const networkId=_networkId;
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
        let details={...this.state.details}
        details.network=networkName;
        if(!this.isWeb3Locked){
          this.web3.eth.getCoinbase((err,_account)=>{
            const account=_account;
            details.account=account;
          });
        }
        this.setState({details});
      });
    }
  }




  render(){
    console.log(this.state);
    console.log(this.isWeb3);
    console.log(this.isWeb3Locked);
    return(
      <React.Fragment>
        <Navbar walletStatus="" sendStatus="disabled"></Navbar>
        <div className="container">
          <h1>Hi</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
