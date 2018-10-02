#### Tokenize Everything
Make sure you have truffle installed.  
Run `npm install` in this folder first.  
Then run any test network provider on your computer.  
Open `truffle.js` and set the `host` and `port` of development network if different.  
Open `migrations/2_deploy_contracts.js` and set the name, symbol, decimals, initial supply of the token.  
Now all you have to do is run `truffle compile` and `truffle migrate --network development` or `truffle migrate --reset --network development`(if deploying again).  

###### NOTE
You can deploy this token on Ropsten Testnet the following way.  
First, head on over to [infura.io](https://infura.io/) and get your API KEY for Ropsten Testnet.  
Then, create a file called `.env` in the project home folder and inside it, set your API KEY and your wallet Mnemonic like the below.

`INFURA_API_KEY=e989f6a542f41fds9t43b5f53e69a892`  
`MNENOMIC=bat stay extend sat vital you vicious immune uniform cat tennis base`  

Now all you have to do is run `truffle compile` and `truffle migrate --network ropsten` or `truffle migrate --reset --network ropsten`(if deploying again).  

Head on over to `TokenizeEverythingClient` folder for further instructions.  

Thanks!
