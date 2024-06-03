const ChoiceContract = artifacts.require("ChoiceContract");

contract("ChoiceContract", (accounts) => {
  let choiceContract;

  beforeEach(async () => {
    choiceContract = await ChoiceContract.new();
  });

  it("should deploy the contract", async () => {
    assert.isNotNull(choiceContract.address);
  });

  it("should add an option", async () => {
    await choiceContract.addOption("Option 1");
    const optionCount = await choiceContract.getOptionCount();
    assert.equal(optionCount.toNumber(), 1, "Option count should be 1");

    const optionName = await choiceContract.getOptionName(1);
    assert.equal(optionName, "Option 1", "Option name should be 'Option 1'");
  });

  it("should allow voting for an option", async () => {
    await choiceContract.addOption("Option 1");
    await choiceContract.vote(1, { from: accounts[0] });

    const voteCount = await choiceContract.getVoteCount(1);
    assert.equal(voteCount.toNumber(), 1, "Vote count should be 1");
  });

  it("should revert when voting for a non-existent option", async () => {
    try {
      await choiceContract.vote(1, { from: accounts[0] });
      assert.fail("Expected revert not received");
    } catch (error) {
      assert.include(
        error.message,
        "Invalid option",
        "Expected 'Invalid option' error message"
      );
    }
  });

  it("should get the correct option name", async () => {
    await choiceContract.addOption("Option 1");
    const optionName = await choiceContract.getOptionName(1);
    assert.equal(optionName, "Option 1", "Option name should be 'Option 1'");
  });

  it("should get the correct vote count", async () => {
    await choiceContract.addOption("Option 1");
    await choiceContract.vote(1, { from: accounts[0] });

    const voteCount = await choiceContract.getVoteCount(1);
    assert.equal(voteCount.toNumber(), 1, "Vote count should be 1");
  });
});
