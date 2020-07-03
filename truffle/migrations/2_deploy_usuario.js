var Usuario = artifacts.require("./Usuario.sol");

module.exports = function(deployer) {
  deployer.deploy(Usuario);
};