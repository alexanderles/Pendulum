// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IResponseRegistry {
    error CooldownIncomplete(uint);
    error ResponseExists(address pendulum, uint questionId);
    error InvocationNotFound(address pendulum, uint questionId);

    event QuestionAsked(
        address pendulum,
        uint questionId,
        address fan,
        uint time,
        bytes32 attestation
    );

    event Answered(
        address pendulum,
        uint questionId,
        address fan,
        uint time,
        bytes32 attestation
    );
}