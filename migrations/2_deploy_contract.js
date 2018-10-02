const TokenizeEverything = artifacts.require("./TokenizeEverything.sol");

module.exports = (deployer) => {
  deployer.deploy(TokenizeEverything, "Sai Token", "SAIT", 4, 10000);
};
