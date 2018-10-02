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
  };

  handleInputAddressChange=(event)=>{
    const inputAddress=event.target.value;
    this.setState({inputAddress:inputAddress});
    if(inputAddress.length>2 && (inputAddress[0]!=='0'||inputAddress[1]!=='x')){
      this.setState({addressHelp:"ETH Address Starts With '0x'",addressHelpClass:"text-danger",transferableAddress:false})
    }else if(inputAddress.length!==42){
      this.setState({addressHelp:"ETH Address Has 42 Characters",addressHelpClass:"text-danger",transferableAddress:false})
    }else{
      this.setState({addressHelp:"Validated",addressHelpClass:"text-success",transferableAddress:true})
    }
  }

  handleInputAmountChange=(event)=>{
    const inputAmount=event.target.value;
    this.setState({inputAmount:inputAmount});
    if(inputAmount){

      if(!isNaN(inputAmount)){
        if(parseFloat(inputAmount)>parseFloat(this.props.accountBalance)){
          this.setState({amountHelp:"Insufficient Balance",amountHelpClass:"text-danger",transferableAmount:false});
        }else if(inputAmount.split(".")[1]){
          if(inputAmount.split(".")[1].length>this.props.tokenDecimals){
            this.setState({amountHelp:"Only "+this.props.tokenDecimals+" Decimals Possible",amountHelpClass:"text-danger",transferableAmount:false})
          }else{
            this.setState({amountHelp:"Validated",amountHelpClass:"text-success",transferableAmount:true})
          }
        }else{
          this.setState({amountHelp:"Validated",amountHelpClass:"text-success",transferableAmount:true})
        }
      }else{
        this.setState({amountHelp:"Only Numbers",amountHelpClass:"text-danger",transferableAmount:false})
      }
    }else{
      this.setState({amountHelp:"Amount Cannot Be Empty",amountHelpClass:"text-danger",transferableAmount:false});
    }
  }


  handleSubmitClick=(event)=>{
    event.preventDefault();
    if(this.state.transferableAddress&&this.state.transferableAmount){
      this.props.onTransfer(this.state.inputAddress,parseFloat(this.state.inputAmount));
    }
    this.setState({
      inputAddress:"",
      inputAmount:"",
      addressHelp:"",
      amountHelp:"",
      addressHelpClass:null,
      amountHelpClass:null,
      transferableAddress:false,
      transferableAmount:false,
    });
  }

  render(){
    return(
      <React.Fragment>
        <div className="jumbotron" style={{paddingTop:'16px',paddingBottom:'16px'}}>
          <h4 className="text-center">Send {this.props.tokenSymbol}</h4>
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
                <button type="submit" className="btn btn-primary" onClick={(e)=>this.handleSubmitClick(e)} disabled={!this.state.transferableAddress || !this.state.transferableAmount}>Send {this.props.tokenSymbol}</button>
              </div>
              <div className="col-md-5"></div>
            </div>
          </form>

        </div>
      </React.Fragment>
    );
  }
}

export default Transfer;
