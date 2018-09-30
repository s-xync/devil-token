const TokenizeEverything = artifacts.require("./TokenizeEverything.sol");

module.exports = (deployer) => {
  deployer.deploy(TokenizeEverything, "HelloToken", "HLTK", 6, 100000);
};
