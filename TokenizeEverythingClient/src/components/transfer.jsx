import React, { Component } from 'react';
class Transfer extends Component{
  state={
    inputAddress:"",
    inputAmount:"",
    addressHelp:"",
    amountHelp:"",
    addressClass:null,
    amountClass:null,
    transferable:false
  };

  handleInputAddressChange=(event)=>{
    this.setState({inputAddress:event.target.value});
  }

  handleInputAmountChange=(event)=>{
    // inputAmount=event.target.value
    // this.setState({inputAmount:inputAmount});
    // if(parseFloat(inputAmount)>parseFloat(this.props.accountBalance)){

    }


  handleSubmitClick=(event)=>{
    event.preventDefault();
    console.log("prevented")
    this.props.onTransfer(this.state.inputAddress,parseFloat(this.state.inputAmount));
    this.setState({inputAddress:"",inputAmount:""});
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
                <small id="addressHelp" className={"form-text "+this.state.addressClass}></small>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputAmount" className="col-md-3 col-form-label text-right"># {this.props.tokenSymbol} to Send:</label>
              <div className="col-md-9">
                <input type="text" className="form-control" id="inputAmount" aria-describedby="amountHelp" placeholder="100" onChange={(e)=>this.handleInputAmountChange(e)} value={this.state.inputAmount}/>
                <small id="amountHelp" className={"form-text "+this.state.amountClass}></small>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-5"></div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary" onClick={(e)=>this.handleSubmitClick(e)} disabled={!this.state.transferable}>Send {this.props.tokenSymbol}</button>
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
