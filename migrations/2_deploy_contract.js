const DevilToken = artifacts.require("./DevilToken.sol");

module.exports = (deployer) => {
  deployer.deploy(DevilToken, "DevilToken", "DVTK", 5, 10000);
};
