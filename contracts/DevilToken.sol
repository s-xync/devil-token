pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";

//standard token the implementation for erc20 interface
//detailed erc20 will let us choose name, symbol, decimals

contract DevilToken is DetailedERC20, StandardToken {
  constructor(string _name,string _symbol,uint8 _decimals,uint256 _amount) DetailedERC20(_name, _symbol, _decimals) public {
    require(_amount > 0, "Amount has to be greater than 0");
    totalSupply_ = _amount.mul(10 ** uint256(_decimals));
    balances[msg.sender] = totalSupply_;
    emit Transfer(address(0), msg.sender, totalSupply_);
  }
}
