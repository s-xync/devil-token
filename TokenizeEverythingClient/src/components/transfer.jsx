import React, { Component } from 'react';

class Transfer extends Component{
  state={
    inputAddress:"",
    inputAmount:"",
    addressHelp:"",
    amountHelp:"",
    addressHelpClass:null,
    amountHelpClass:null,
    transferableAddress:false,
    transferableAmount:false,
    sendingTransactionHash:null,
    sendingTransactionError:null,
    sendingTransactionConfirmed:null
  };

  handleTransfer=(toAddress,amount)=>{//fires when send button is pressed
    if(toAddress && amount){//checking second time just because I can ;)
      if(toAddress[0]==='0' && toAddress[1]==='x'&& toAddress.length===42 && amount>0 && amount<=parseFloat(this.props.accountBalance)){
        this.props.tokenizeEverything.deployed().then((instance)=>{
          instance.transfer(toAddress,amount*10**this.props.tokenDecimals,{from:this.props.accountAddress}).then((transaction)=>{
            this.setState({sendingTransactionHash:transaction.tx});
          }).catch((error)=>{
            console.log(error);
            this.setState({sendingTransactionError:error});
          });
        });
      }
    }
  }//handleTransfer ends

  handleInputAddressChange=(event)=>{
    const inputAddress=event.target.value;
    this.setState({inputAddress:inputAddress});
    if(inputAddress.length>2 && (inputAddress[0]!=='0'||inputAddress[1]!=='x')){
      this.setState({addressHelp:"ETH Address Starts With '0x'",addressHelpClass:"text-danger",transferableAddress:false});
    }else if(inputAddress.length!==42){
      this.setState({addressHelp:"ETH Address Has 42 Characters",addressHelpClass:"text-danger",transferableAddress:false});
    }else{
      this.setState({addressHelp:"Validated",addressHelpClass:"text-success",transferableAddress:true});
    }
  }//handleInputAddressChange ends

  handleInputAmountChange=(event)=>{
    const inputAmount=event.target.value;
    this.setState({inputAmount:inputAmount});
    if(inputAmount){
      if(!isNaN(inputAmount)){
        if(parseFloat(inputAmount)>parseFloat(this.props.accountBalance)){
          this.setState({amountHelp:"Insufficient Balance",amountHelpClass:"text-danger",transferableAmount:false});
        }else if(inputAmount.split(".")[1]){
          if(inputAmount.split(".")[1].length>this.props.tokenDecimals){
            this.setState({amountHelp:"Only "+this.props.tokenDecimals+" Decimals Possible",amountHelpClass:"text-danger",transferableAmount:false});
          }else{
            this.setState({amountHelp:"Validated",amountHelpClass:"text-success",transferableAmount:true});
          }
        }else{
          this.setState({amountHelp:"Validated",amountHelpClass:"text-success",transferableAmount:true});
        }
      }else{
        this.setState({amountHelp:"Only Numbers",amountHelpClass:"text-danger",transferableAmount:false});
      }
    }else{
      this.setState({amountHelp:"Amount Cannot Be Empty",amountHelpClass:"text-danger",transferableAmount:false});
    }
  }//handleInputAmountChange ends

  handleSubmitTransaction=(event)=>{
    event.preventDefault();
    if(this.state.transferableAddress&&this.state.transferableAmount){
      this.handleTransfer(this.state.inputAddress,parseFloat(this.state.inputAmount));
    }
  }handleSubmitTransaction ends

  handleCreateNewTransaction=(event)=>{
    event.preventDefault();
    this.setState({
      inputAddress:"",
      inputAmount:"",
      addressHelp:"",
      amountHelp:"",
      addressHelpClass:null,
      amountHelpClass:null,
      transferableAddress:false,
      transferableAmount:false,
      sendingTransactionHash:null,
      sendingTransactionError:null,
      sendingTransactionConfirmed:null
    });
  }handleCreateNewTransaction ends

  render(){
    console.log(this.state);
    if(this.state.sendingTransactionHash || this.state.sendingTransactionError){
      if(this.state.sendingTransactionHash){
        if(this.state.sendingTransactionConfirmed){//transaction confirmed rendering
          return(
            <React.Fragment>
              <div className="jumbotron" style={{paddingTop:'24px',paddingBottom:'16px'}}>
                <h4 className="text-center">Send {this.props.tokenSymbol}</h4>
                <hr className="my-4"/>
                <h5 className="text-center">Transaction Confirmed</h5>
                <br></br>
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-2">
                    <a href={"https://ropsten.etherscan.io/tx/"+this.state.sendingTransactionHash} className="btn btn-outline-primary" role="button" aria-pressed="true" target="_blank" rel="noopener noreferrer">Details</a>
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-2">
                    <button className="btn btn-primary" onClick={(e)=>this.handleCreateNewTransaction(e)}>Send {this.props.tokenSymbol}</button>
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </div>
            </React.Fragment>
          );//transaction confirmed rendering
        }else{//transaction not confirmed yet rendering
          return(
            <React.Fragment>
              <div className="jumbotron" style={{paddingTop:'24px',paddingBottom:'16px'}}>
                <h4 className="text-center">Send {this.props.tokenSymbol}</h4>
                <hr className="my-4"/>
                <img className="img-fluid" style={{display:"block",marginLeft:"auto",marginRight:"auto"}} src={require('../assets/loading.svg')} alt="loading.svg"/>
                <br></br>
                <h5 className="text-center">Mining In Progress...</h5>
                <br></br>
                <div className="row">
                  <div className="col-md-5"></div>
                  <div className="col-md-2">
                    <a href={"https://ropsten.etherscan.io/tx/"+this.state.sendingTransactionHash} className="btn btn-outline-primary" role="button" aria-pressed="true" target="_blank" rel="noopener noreferrer">Details</a>
                  </div>
                  <div className="col-md-5"></div>
                </div>
              </div>
            </React.Fragment>
          );//transaction not confirmed yet rendering
        }
      }else if(this.state.sendingTransactionError){//transaction was unsuccessful rendering
        return(
          <React.Fragment>
            <div className="jumbotron" style={{paddingTop:'24px',paddingBottom:'16px'}}>
              <h4 className="text-center">Send {this.props.tokenSymbol}</h4>
              <hr className="my-4"/>
              <h5 className="text-center">Error : Transaction Reverted</h5>
              <br></br>
              <div className="row">
                <div className="col-md-5"></div>
                <div className="col-md-2">
                  <button className="btn btn-primary" onClick={(e)=>this.handleCreateNewTransaction(e)}>Send {this.props.tokenSymbol}</button>
                </div>
                <div className="col-md-5"></div>
              </div>
            </div>
          </React.Fragment>
        );//transaction was unsuccessful rendering ends
      }
    }else{//no transaction rendering
      return(
        <React.Fragment>
          <div className="jumbotron" style={{paddingTop:'24px',paddingBottom:'16px'}}>
            <h4 className="text-center">Send {this.props.tokenSymbol}</h4>
            <hr className="my-4"/>
            <form>
              <div className="form-group row">
                <label htmlFor="inputAddress" className="col-md-3 col-form-label text-right">ETH Address:</label>
                <div className="col-md-9">
                  <input type="text" className="form-control" id="inputAddress" aria-describedby="addressHelp" placeholder="0x3e836467a..." onChange={(e)=>this.handleInputAddressChange(e)} value={this.state.inputAddress}/>
                  <small id="addressHelp" className={"form-text "+this.state.addressHelpClass}>{this.state.addressHelp}</small>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputAmount" className="col-md-3 col-form-label text-right"># {this.props.tokenSymbol} to Send:</label>
                <div className="col-md-9">
                  <input type="text" className="form-control" id="inputAmount" aria-describedby="amountHelp" placeholder="100" onChange={(e)=>this.handleInputAmountChange(e)} value={this.state.inputAmount}/>
                  <small id="amountHelp" className={"form-text "+this.state.amountHelpClass}>{this.state.amountHelp}</small>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-5"></div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary" onClick={(e)=>this.handleSubmitTransaction(e)} disabled={!this.state.transferableAddress || !this.state.transferableAmount}>Send {this.props.tokenSymbol}</button>
                </div>
                <div className="col-md-5"></div>
              </div>
            </form>
          </div>
        </React.Fragment>
      );//no transaction rendering ends
    }
  }//render ends
}

export default Transfer;
