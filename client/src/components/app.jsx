import React, { Component } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import DevilToken from '../contracts/DevilToken.json';
import Navbar from './navbar.jsx';


class App extends Component{
  render(){
    return(
      <React.Fragment>
        <Navbar></Navbar>
        <h1>Hi</h1>
      </React.Fragment>
    );
  }
}

export default App;
