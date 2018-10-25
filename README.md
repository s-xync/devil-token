#### Tokenize Everything

Tokenize Everything creates an ERC20 Token and gives you a Front-End web app to manage it by showing all transactions sent or received previously and also to make new sending transactions. Tokenize Everything uses ReactJS for front-end. The ERC20 Token is a Smart Contract deployed on Ethereum Virtual Machine and the ReactJS app communicates with the Smart Contract using Web3. It uses the Local Storage provided by browser for a more smoother experience.  

##### Showcase  
The design specifications for this project can be found [here](https://github.com/s-xync/tokenize-everything/blob/master/showcase/Project_Specifications.pdf).  
[Image1](https://raw.githubusercontent.com/s-xync/tokenize-everything/master/showcase/tkev1.png){:height="50%" width="50%"}

##### Installation  
To see this yourself, just follow the process below...  
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

Head on over to [TokenizeEverythingClient](https://github.com/s-xync/tokenize-everything/tree/master/TokenizeEverythingClient) folder for further instructions.  

Thanks!
