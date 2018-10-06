#### Tokenize Everything Client

1. First, you need ABI of your contract after compilation and address of your contract after deploying.  

2. If your `TokenizeEverythingClient` is present in the parent directory `TokenizeEverything` instead of being a stand-alone directory, then go to the 3rd step else go to the 4th step.  

3. Navigate to the `src` of `TokenizeEverythingClient` and run the following command `ln -s ../../build/contracts/ contracts`. After this, skip to the final step directly.

4. Navigate to the `src` of `TokenizeEverythingClient` and create a folder called `contracts`. Now create a new file called `TokenizeEverything.json` and inside, enter the `abi` after contract compilation and `contract address` after contract deployment. You have to enter the contract address in the proper network field. `3 --> ropsten` and `5777 --> local`. For reference, navigate to the end of README.md to get an idea of how `TokenizeEverything.json` looks. You can get the `abi` of the contract after running `truffle compile` and navigating to `build/contracts/TokenizeEverything.json` in the `TokenizeEverything` directory. Now go to the final step.  

6. Now, pretty much all you have to do is run `npm install` and `npm start`.  

`TokenizeEverything.json`  
```
{
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "networks": {
    "3": {
      "address": "0xe451b9b2e2ceda28d46dacf75cc8feb2d5189e25"
    },
    "5777": {
      "address": "0x1891u9b2e56edafgd46dacf75cfgheb2d518tels"
    }
  }
}
```

Thanks!
