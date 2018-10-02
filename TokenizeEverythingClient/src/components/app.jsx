import React, { Component } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import TokenizeEverything from '../contracts/TokenizeEverything.json';
import NavMet from './navmet.jsx';
import DetWall from './detwall.jsx';
import DetSend from './detsend.jsx';
//the contracts folder in the src folder is a symlink
//to the original build/contracts in the truffle project

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isWeb3Locked:false,
      accountAddress:null,
      accountBalance:null,
      networkName:null,
      tokenAddress:null,
      tokenSymbol:null,
      tokenName:null,
      tokenDecimals:null,
      transactions:[]
    };
    //each transaction represents the below in the transactions array
    //from,to,value,timeString,trxnHash
    //if from is accountAddress -> value is negative
    //if to is accountAddress -> value is positive

    this.expiryTime=1440; //minutes 24*60=1440min
    //localStorage data older than one day will not be used
    //instead the logs will be traversed again and transactions array is built


    this.isWeb3=true;
    //  isWeb3 says if web3 is available
    // isWeb3Locked says if the wallet is locked

    this.latestFirstEvent=true;//debug normally has to be set to false
    // we always have a latest first event that is always seen by our
    // application and we need to discard it as it may have happened long ago.

    /*
    // TODO: https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    // TODO: https://medium.com/pixelpoint/track-blockchain-transactions-like-a-boss-with-web3-js-c149045ca9bf
    // TODO: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#events
    */

    const web3= window.web3;
    if (typeof web3 !== 'undefined') {
      this.web3Provider = web3.currentProvider;
      this.web3 = new Web3(web3.currentProvider);
      this.tokenizeEverything = TruffleContract(TokenizeEverything);
      this.tokenizeEverything.setProvider(this.web3Provider);
    }else{
      this.isWeb3 = false;
    }

    this.getAccountDetails = this.getAccountDetails.bind(this);
    this.setupTokenAndNetworkDetails = this.setupTokenAndNetworkDetails.bind(this);
    this.watchTokenTransferEvents = this.watchTokenTransferEvents.bind(this);
    this.storeTransactionsLocally=this.storeTransactionsLocally.bind(this);
    this.getTransactionsLocally=this.getTransactionsLocally.bind(this);
    this.setupTransactions = this.setupTransactions.bind(this);
  }//constructor ends

  createNewTransactionObject(fromAddress,toAddress,accountAddress,value,decimals,trxnHash,date){
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let newTransaction={
      fromAddress:fromAddress,
      toAddress:toAddress,
      trxnHash:trxnHash
    };
    let sign="";
    if(fromAddress===accountAddress){
      sign="-";
    }else if(toAddress===accountAddress){
      sign="+";
    }
    newTransaction.value=sign+(value.toNumber()/(10**decimals)).toString();
    let timeString="";
    timeString=timeString+date.getDate(); // 16:34:05 26/10/2018 -> 26
    timeString=timeString+" "+months[date.getMonth()-1]; // 16:34:05 26/10/2018 -> 10 -> Oct
    const hours=date.getHours();
    timeString=timeString+" "+(hours%12===0?12:hours%12)+(hours>=12?"pm":"am"); // 0:34:05 26/10/2018 -> 12am
    newTransaction.timeString=timeString;
    return newTransaction;
  }//createNewTransactionObject ends

  watchTokenTransferEvents(){
    if(this.isWeb3 && !this.state.isWeb3Locked){
      //the filter does not seem to work and so, we have to do our own filtering ):
      this.tokenizeEverything.deployed().then((instance)=>{
        instance.Transfer({},{
          fromBlock:'latest',//debug
          toBlock:'latest'
        }).watch((error,event)=>{
          if(error){
            console.log(error);
          }else{
            if(this.latestFirstEvent){
              if(event.args.to===this.state.accountAddress || event.args.from===this.state.accountAddress){
                const newTransaction=this.createNewTransactionObject(event.args.from,event.args.to,this.state.accountAddress,event.args.value,this.state.tokenDecimals,event.transactionHash,new Date());
                this.setState({transactions:[newTransaction, ...this.state.transactions]});
                this.getAccountDetails();
              }else{
                console.log("Someone just did a transaction where you are neither a sender nor a receiver!");
              }
            }else{
              this.latestFirstEvent=true;
            }
          }
        });
      });
    }
  }//watchTokenTransferEvents ends



  getAccountDetails(){
    if(this.isWeb3){
      this.web3.eth.getCoinbase((err,accountAddress)=>{
        if(accountAddress){
          this.setState({accountAddress:accountAddress});
          this.tokenizeEverything.deployed().then((instance)=>{
            instance.balanceOf(accountAddress).then((accountBalance)=>{
              instance.decimals().then((decimals)=>this.setState({accountBalance:(accountBalance/(10**decimals.toNumber())).toString()}));
            });
          });
        }else{
          this.setState({isWeb3Locked:true});
        }
      });
    }
  }//getAccountDetails ends

  setupTokenAndNetworkDetails(){
    if(this.isWeb3){
      this.web3.version.getNetwork((err,networkId)=>{
        let networkName;
        switch (networkId) {
          case "3":
          networkName = "Ropsten";
          this.latestFirstEvent=true;
          break;
          default:
          networkName = networkId.toString();
          this.latestFirstEvent=false;
          // in local network, we are getting the last available event
          //everytime we call the watching function which is not a problem
          //in ropsten and so, to discard that first event, we are using this
          //variable latestFirstEvent
        }
        this.setState({networkName:networkName});
      });
      this.tokenizeEverything.deployed().then((instance)=>{
        instance.symbol().then((tokenSymbol)=>this.setState({tokenSymbol:tokenSymbol}));
        instance.name().then((tokenName)=>this.setState({tokenName:tokenName}));
        instance.decimals().then((tokenDecimalsBigNumber)=>this.setState({tokenDecimals:tokenDecimalsBigNumber.toNumber()}));
        return instance.address;
      }).then((tokenAddress)=>this.setState({tokenAddress:tokenAddress}));
    }
  }//setupTokenAndNetworkDetails ends

  componentDidMount(){
    this.getAccountDetails();
    this.setupTokenAndNetworkDetails();
    this.getTransactionsLocally();
    this.watchTokenTransferEvents();
    // event listener to call storeTransactionsLocally to when user leaves/refreshes the page
    window.addEventListener("beforeunload",this.storeTransactionsLocally);
  }//componentDidMount ends

  componentWillUnmount() {
    window.removeEventListener("beforeunload",this.storeTransactionsLocally);
    // saves if component has a chance to unmount
    this.storeTransactionsLocally();
  }//componentWillUnmount ends

  setupTransactions(){
    console.log("Fresh setup of transactions!");//debug
    if(this.isWeb3){
      this.web3.eth.getCoinbase((err,accountAddress)=>{
        this.tokenizeEverything.deployed().then((instance)=>{
          const transferEvent=instance.Transfer({},{fromBlock:'0',toBlock:'latest'});
          transferEvent.get((error,logs)=>{
            if(error){
              console.log(error);
            }else{
              let transactions=[]
              for(const event of logs){
                if(event.args.to===accountAddress || event.args.from===accountAddress){
                  const newTransaction=this.createNewTransactionObject(event.args.from,event.args.to,accountAddress,event.args.value,this.state.tokenDecimals,event.transactionHash,new Date());
                  transactions.unshift(newTransaction);
                }
              }
              this.setState({transactions:transactions});
            }
          });
        });
      });
    }
  }//setupTransactions ends

  getTransactionsLocally(){
    if(this.isWeb3){
      this.web3.eth.getCoinbase((err,accountAddress)=>{
        this.tokenizeEverything.deployed().then((instance)=>{
          return instance.address;
        }).then((tokenAddress)=>{
          if(accountAddress && tokenAddress){
            let localTransactions=localStorage.getItem("Transactions "+this.state.accountAddress+this.state.tokenAddress);
            let localTransactionsDate=new Date(parseInt(localStorage.getItem("Transactions "+this.state.accountAddress+this.state.tokenAddress+" Date"),10))
            let now=new Date()
            if(localTransactions && localTransactionsDate){
              let timeElapsed=Math.round((now-localTransactionsDate)/(1000*60)) //minutes
              if(timeElapsed<this.expiryTime){
                //old data
                //expiryTime is defined in the constructor
                this.setState({transactions:JSON.parse(localTransactions)})
              }else{
                this.setupTransactions()
              }
            }else{
              this.setupTransactions()
            }
          }
        });
      });
    }
  }//getTransactionsLocally ends

  storeTransactionsLocally(){
    //localStorage key->accountAddress+tokenAddress value->transactions
    //localStorage key->accountAddress+tokenAddress+Date value->date
    if(this.isWeb3){
      this.web3.eth.getCoinbase((err,accountAddress)=>{
        this.tokenizeEverything.deployed().then((instance)=>{
          return instance.address;
        }).then((tokenAddress)=>{
          if(accountAddress && tokenAddress){
            localStorage.setItem("Transactions "+this.state.accountAddress+this.state.tokenAddress,JSON.stringify(this.state.transactions));
            localStorage.setItem("Transactions "+this.state.accountAddress+this.state.tokenAddress+" Date", Date.now());
          }
        });
      });
    }
  }//storeTransactionsLocally ends

  render(){
    if(this.isWeb3 && !this.state.isWeb3Locked){
      // web3 is available and also the wallet is unlocked
      if(this.props.type==="wallet"){
        // nav, details, wallet
        return(
          <DetWall accountAddress={this.state.accountAddress} accountBalance={this.state.accountBalance} tokenSymbol={this.state.tokenSymbol} networkName={this.state.networkName} tokenAddress={this.state.tokenAddress} tokenName={this.state.tokenName} transactions={this.state.transactions}/>
        );
      }else if(this.props.type==="send"){
        // nav, details, send
        return(
          <DetSend accountAddress={this.state.accountAddress} accountBalance={this.state.accountBalance} tokenSymbol={this.state.tokenSymbol} tokenDecimals={this.state.tokenDecimals} networkName={this.state.networkName} tokenAddress={this.state.tokenAddress} tokenName={this.state.tokenName} tokenizeEverything={this.tokenizeEverything}/>
        );
      }
    }else if(this.isWeb3 && this.state.isWeb3Locked){
      // web3 is available but the wallet is locked
      return(
        <NavMet reason="web3locked" tokenSymbol={this.state.tokenSymbol} tokenName={this.state.tokenName}/>
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
