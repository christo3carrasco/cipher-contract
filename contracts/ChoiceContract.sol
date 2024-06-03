// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18 <0.9.0;

contract ChoiceContract {
    constructor() {}

    struct Option {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    Option[] public options;
    mapping(uint256 => uint256) public optionIndexById;

    function addOption(string memory _name) public {
        uint256 optionId = options.length + 1;
        options.push(Option(optionId, _name, 0));
        optionIndexById[optionId] = options.length;
    }

    event Voted(uint256 optionId);

    function vote(uint256 _optionId) public {
        require(
            _optionId > 0 && _optionId <= options.length,
            "Invalid option."
        );

        Option storage option = options[optionIndexById[_optionId] - 1];
        option.voteCount++;

        emit Voted(_optionId);
    }

    function getVoteCount(uint256 _optionId) public view returns (uint256) {
        require(
            _optionId > 0 && _optionId <= options.length,
            "Invalid option."
        );

        return options[optionIndexById[_optionId] - 1].voteCount;
    }

    function getOptionName(
        uint256 _optionId
    ) public view returns (string memory) {
        require(
            _optionId > 0 && _optionId <= options.length,
            "Invalid option."
        );

        return options[optionIndexById[_optionId] - 1].name;
    }

    function getOptionCount() public view returns (uint256) {
        return options.length;
    }
}
