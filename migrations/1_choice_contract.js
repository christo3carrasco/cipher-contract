const ChoiceContract = artifacts.require("ChoiceContract");

module.exports = (_deployer) => {
  _deployer.deploy(ChoiceContract);
};
