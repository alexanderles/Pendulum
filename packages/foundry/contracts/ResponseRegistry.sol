// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {IERC165Upgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/utils/introspection/IERC165Upgradeable.sol";
import {ERC165Upgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/utils/introspection/ERC165Upgradeable.sol";
import {OwnableUpgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
import {AddressUpgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/utils/AddressUpgradeable.sol";
import {IResponseRegistry} from "./interfaces/IResponseRegistry.sol";
import {IPendulum} from "./interfaces/IPendulum.sol";

contract ResponseRegistry is
    ERC165Upgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    IResponseRegistry
{
    uint256 private constant _VERSION = 1;

    bytes32 questionSchemaUID;
    bytes32 answerSchemaUID;

    /// Mapping for pendulum: questionId (1,2,3...) to AES attestation UID. questionId starts at 1.
    mapping(address pendulum => mapping(uint256 questionId => bytes32 questionAttestation))
        public questions;

    /// Count of questions made: used to calculate questionId of the next question.
    mapping(address pendulum => uint256 count) public questionCount;

    /// Mapping for answers (answers to questions): matching questionId to AES attestation UID.
    mapping(address pendulum => mapping(uint256 questionId => bytes32 responseAttestation))
        public answers;

    uint256[50] private __gap;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// @dev  Initializes the contract.
    function initialize(
        bytes32 _questionSchemaUID,
        bytes32 _answerSchemaUID
    ) public initializer {
        questionSchemaUID = _questionSchemaUID;
        answerSchemaUID = _answerSchemaUID;
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC165Upgradeable)
        returns (bool isInterfaceSupported)
    {
        return
            interfaceId == type(IResponseRegistry).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function askQuestion(address pendulum, bytes32 attestation) public virtual {
        uint256 lastInvocationTime = IPendulum(pendulum).lastInvocationTime();
        uint256 cooldown = IPendulum(pendulum).questionFrequency();

        // if (block.timestamp < lastInvocationTime + cooldown) {
        //     revert CooldownIncomplete(
        //         lastInvocationTime + cooldown - block.timestamp
        //     );
        // }

        questionCount[pendulum] += 1;
        uint256 questionId = questionCount[pendulum];

        questions[pendulum][questionId] = attestation;
        IPendulum(pendulum).setLastInvocationTime(block.timestamp);

        emit QuestionAsked(
            pendulum,
            questionId,
            msg.sender,
            block.timestamp,
            attestation
        );
    }

    function answerQuestion(
        address pendulum,
        uint256 questionId,
        bytes32 attestation
    ) external virtual {
        if (questionId > questionCount[pendulum] || questionId == 0) {
            revert InvocationNotFound(pendulum, questionId);
        }
        if (responseExists(pendulum, questionId)) {
            revert ResponseExists(pendulum, questionId);
        }

        answers[pendulum][questionId] = attestation;

        emit Answered(
            pendulum,
            questionId,
            msg.sender,
            block.timestamp,
            attestation
        );
    }

    function responseExists(
        address pendulum,
        uint256 questionId
    ) public view virtual returns (bool isResponseFound) {
        if (answers[pendulum][questionId] != bytes32(0)) {
            return true;
        }
        return false;
    }

    function version() public view virtual returns (uint256) {
        return _VERSION;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
