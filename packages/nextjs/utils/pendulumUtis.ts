export function secondsToDhms(seconds: number): string {
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay;
}

export function formatEthereumAddress(address: string | undefined): string {
  address = address ? address : "Default";
  const visibleParts = 3; // Number of visible parts
  const parts = address.split("");
  const formattedParts = [...parts.slice(0, visibleParts), "...", ...parts.slice(-visibleParts)];
  return formattedParts.join("");
}

export function calculateRemainingTime(endTime: Date): string {
  const now = new Date();
  const timeDifference = endTime.getTime() - now.getTime();

  if (timeDifference <= 0) {
    return "Expired";
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (timeDifference > 86400000) {
    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  } else {
    return `${hours}h : ${minutes}m : ${seconds}s`;
  }
}

export function getCorrectEASAddress(network: number): { address: string; abi: any } {
  switch (network) {
    case 1:
      return {
        address: "0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587",
        abi: [
          {
            inputs: [
              {
                internalType: "contract ISchemaRegistry",
                name: "registry",
                type: "address",
              },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [],
            name: "AccessDenied",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevoked",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevokedOffchain",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyTimestamped",
            type: "error",
          },
          {
            inputs: [],
            name: "InsufficientValue",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidExpirationTime",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidLength",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidOffset",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRegistry",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSchema",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSignature",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidVerifier",
            type: "error",
          },
          {
            inputs: [],
            name: "Irrevocable",
            type: "error",
          },
          {
            inputs: [],
            name: "NotFound",
            type: "error",
          },
          {
            inputs: [],
            name: "NotPayable",
            type: "error",
          },
          {
            inputs: [],
            name: "WrongSchema",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Attested",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Revoked",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "RevokedOffchain",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "Timestamped",
            type: "event",
          },
          {
            inputs: [],
            name: "VERSION",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct AttestationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "attest",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedAttestationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "attestByDelegation",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [],
            name: "getAttestTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "getAttestation",
            outputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "uid",
                    type: "bytes32",
                  },
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    internalType: "uint64",
                    name: "time",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "expirationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "revocationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "bytes32",
                    name: "refUID",
                    type: "bytes32",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                  {
                    internalType: "bool",
                    name: "revocable",
                    type: "bool",
                  },
                  {
                    internalType: "bytes",
                    name: "data",
                    type: "bytes",
                  },
                ],
                internalType: "struct Attestation",
                name: "",
                type: "tuple",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getDomainSeparator",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "getNonce",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getRevokeTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [],
            name: "getSchemaRegistry",
            outputs: [
              {
                internalType: "contract ISchemaRegistry",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "isAttestationValid",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiAttestationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttest",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedAttestationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttestByDelegation",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiRevocationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedRevocationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct RevocationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "revoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedRevocationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "revokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "revokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "timestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
      };
    case 11155111:
      return {
        address: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
        abi: [
          {
            inputs: [
              {
                internalType: "contract ISchemaRegistry",
                name: "registry",
                type: "address",
              },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [],
            name: "AccessDenied",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevoked",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevokedOffchain",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyTimestamped",
            type: "error",
          },
          {
            inputs: [],
            name: "InsufficientValue",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidExpirationTime",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidLength",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidOffset",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRegistry",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSchema",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSignature",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidVerifier",
            type: "error",
          },
          {
            inputs: [],
            name: "Irrevocable",
            type: "error",
          },
          {
            inputs: [],
            name: "NotFound",
            type: "error",
          },
          {
            inputs: [],
            name: "NotPayable",
            type: "error",
          },
          {
            inputs: [],
            name: "WrongSchema",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Attested",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Revoked",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "RevokedOffchain",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "Timestamped",
            type: "event",
          },
          {
            inputs: [],
            name: "VERSION",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct AttestationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "attest",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedAttestationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "attestByDelegation",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [],
            name: "getAttestTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "getAttestation",
            outputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "uid",
                    type: "bytes32",
                  },
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    internalType: "uint64",
                    name: "time",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "expirationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "revocationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "bytes32",
                    name: "refUID",
                    type: "bytes32",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                  {
                    internalType: "bool",
                    name: "revocable",
                    type: "bool",
                  },
                  {
                    internalType: "bytes",
                    name: "data",
                    type: "bytes",
                  },
                ],
                internalType: "struct Attestation",
                name: "",
                type: "tuple",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getDomainSeparator",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "getNonce",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getRevokeTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [],
            name: "getSchemaRegistry",
            outputs: [
              {
                internalType: "contract ISchemaRegistry",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "isAttestationValid",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiAttestationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttest",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedAttestationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttestByDelegation",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiRevocationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedRevocationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct RevocationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "revoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedRevocationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "revokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "revokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "timestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
      };
    case 420:
      return {
        address: "0x4200000000000000000000000000000000000021",
        abi: [
          {
            inputs: [],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [],
            name: "AccessDenied",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevoked",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevokedOffchain",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyTimestamped",
            type: "error",
          },
          {
            inputs: [],
            name: "InsufficientValue",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidExpirationTime",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidLength",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidOffset",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRegistry",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSchema",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSignature",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidVerifier",
            type: "error",
          },
          {
            inputs: [],
            name: "Irrevocable",
            type: "error",
          },
          {
            inputs: [],
            name: "NotFound",
            type: "error",
          },
          {
            inputs: [],
            name: "NotPayable",
            type: "error",
          },
          {
            inputs: [],
            name: "WrongSchema",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Attested",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Revoked",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "RevokedOffchain",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "Timestamped",
            type: "event",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct AttestationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "attest",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedAttestationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "attestByDelegation",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [],
            name: "getAttestTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "getAttestation",
            outputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "uid",
                    type: "bytes32",
                  },
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    internalType: "uint64",
                    name: "time",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "expirationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "revocationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "bytes32",
                    name: "refUID",
                    type: "bytes32",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                  {
                    internalType: "bool",
                    name: "revocable",
                    type: "bool",
                  },
                  {
                    internalType: "bytes",
                    name: "data",
                    type: "bytes",
                  },
                ],
                internalType: "struct Attestation",
                name: "",
                type: "tuple",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getDomainSeparator",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getName",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "getNonce",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getRevokeTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [],
            name: "getSchemaRegistry",
            outputs: [
              {
                internalType: "contract ISchemaRegistry",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "isAttestationValid",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiAttestationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttest",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedAttestationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttestByDelegation",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiRevocationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedRevocationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct RevocationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "revoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedRevocationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "revokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "revokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "timestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "version",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
      };
    case 10:
      return {
        address: "0x4200000000000000000000000000000000000021",
        abi: [
          {
            inputs: [],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [],
            name: "AccessDenied",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevoked",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevokedOffchain",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyTimestamped",
            type: "error",
          },
          {
            inputs: [],
            name: "InsufficientValue",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidExpirationTime",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidLength",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidOffset",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRegistry",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSchema",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSignature",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidVerifier",
            type: "error",
          },
          {
            inputs: [],
            name: "Irrevocable",
            type: "error",
          },
          {
            inputs: [],
            name: "NotFound",
            type: "error",
          },
          {
            inputs: [],
            name: "NotPayable",
            type: "error",
          },
          {
            inputs: [],
            name: "WrongSchema",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Attested",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Revoked",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "RevokedOffchain",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "Timestamped",
            type: "event",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct AttestationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "attest",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedAttestationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "attestByDelegation",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [],
            name: "getAttestTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "getAttestation",
            outputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "uid",
                    type: "bytes32",
                  },
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    internalType: "uint64",
                    name: "time",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "expirationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "revocationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "bytes32",
                    name: "refUID",
                    type: "bytes32",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                  {
                    internalType: "bool",
                    name: "revocable",
                    type: "bool",
                  },
                  {
                    internalType: "bytes",
                    name: "data",
                    type: "bytes",
                  },
                ],
                internalType: "struct Attestation",
                name: "",
                type: "tuple",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getDomainSeparator",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getName",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "getNonce",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getRevokeTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [],
            name: "getSchemaRegistry",
            outputs: [
              {
                internalType: "contract ISchemaRegistry",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "isAttestationValid",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiAttestationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttest",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedAttestationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttestByDelegation",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiRevocationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedRevocationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct RevocationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "revoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedRevocationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "revokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "revokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "timestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "version",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
      };
    case 8453:
      return {
        address: "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A",
        abi: [
          {
            inputs: [
              {
                internalType: "contract ISchemaRegistry",
                name: "registry",
                type: "address",
              },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [],
            name: "AccessDenied",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevoked",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevokedOffchain",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyTimestamped",
            type: "error",
          },
          {
            inputs: [],
            name: "InsufficientValue",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidExpirationTime",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidLength",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidOffset",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRegistry",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSchema",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSignature",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidVerifier",
            type: "error",
          },
          {
            inputs: [],
            name: "Irrevocable",
            type: "error",
          },
          {
            inputs: [],
            name: "NotFound",
            type: "error",
          },
          {
            inputs: [],
            name: "NotPayable",
            type: "error",
          },
          {
            inputs: [],
            name: "WrongSchema",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Attested",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Revoked",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "RevokedOffchain",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "Timestamped",
            type: "event",
          },
          {
            inputs: [],
            name: "VERSION",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct AttestationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "attest",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedAttestationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "attestByDelegation",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [],
            name: "getAttestTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "getAttestation",
            outputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "uid",
                    type: "bytes32",
                  },
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    internalType: "uint64",
                    name: "time",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "expirationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "revocationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "bytes32",
                    name: "refUID",
                    type: "bytes32",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                  {
                    internalType: "bool",
                    name: "revocable",
                    type: "bool",
                  },
                  {
                    internalType: "bytes",
                    name: "data",
                    type: "bytes",
                  },
                ],
                internalType: "struct Attestation",
                name: "",
                type: "tuple",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getDomainSeparator",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getName",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "getNonce",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getRevokeTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [],
            name: "getSchemaRegistry",
            outputs: [
              {
                internalType: "contract ISchemaRegistry",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "isAttestationValid",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiAttestationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttest",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedAttestationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttestByDelegation",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiRevocationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedRevocationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct RevocationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "revoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedRevocationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "revokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "revokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "timestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
      };

    default:
      return {
        address: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
        abi: [
          {
            inputs: [
              {
                internalType: "contract ISchemaRegistry",
                name: "registry",
                type: "address",
              },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [],
            name: "AccessDenied",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevoked",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyRevokedOffchain",
            type: "error",
          },
          {
            inputs: [],
            name: "AlreadyTimestamped",
            type: "error",
          },
          {
            inputs: [],
            name: "InsufficientValue",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidAttestations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidExpirationTime",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidLength",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidOffset",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRegistry",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocation",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidRevocations",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSchema",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidSignature",
            type: "error",
          },
          {
            inputs: [],
            name: "InvalidVerifier",
            type: "error",
          },
          {
            inputs: [],
            name: "Irrevocable",
            type: "error",
          },
          {
            inputs: [],
            name: "NotFound",
            type: "error",
          },
          {
            inputs: [],
            name: "NotPayable",
            type: "error",
          },
          {
            inputs: [],
            name: "WrongSchema",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Attested",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "attester",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "schema",
                type: "bytes32",
              },
            ],
            name: "Revoked",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "RevokedOffchain",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
              {
                indexed: true,
                internalType: "uint64",
                name: "timestamp",
                type: "uint64",
              },
            ],
            name: "Timestamped",
            type: "event",
          },
          {
            inputs: [],
            name: "VERSION",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct AttestationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "attest",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedAttestationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "attestByDelegation",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [],
            name: "getAttestTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "getAttestation",
            outputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "uid",
                    type: "bytes32",
                  },
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    internalType: "uint64",
                    name: "time",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "expirationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "uint64",
                    name: "revocationTime",
                    type: "uint64",
                  },
                  {
                    internalType: "bytes32",
                    name: "refUID",
                    type: "bytes32",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                  {
                    internalType: "bool",
                    name: "revocable",
                    type: "bool",
                  },
                  {
                    internalType: "bytes",
                    name: "data",
                    type: "bytes",
                  },
                ],
                internalType: "struct Attestation",
                name: "",
                type: "tuple",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getDomainSeparator",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "getNonce",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "revoker",
                type: "address",
              },
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getRevokeTypeHash",
            outputs: [
              {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
              },
            ],
            stateMutability: "pure",
            type: "function",
          },
          {
            inputs: [],
            name: "getSchemaRegistry",
            outputs: [
              {
                internalType: "contract ISchemaRegistry",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "getTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "uid",
                type: "bytes32",
              },
            ],
            name: "isAttestationValid",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiAttestationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttest",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                      },
                      {
                        internalType: "uint64",
                        name: "expirationTime",
                        type: "uint64",
                      },
                      {
                        internalType: "bool",
                        name: "revocable",
                        type: "bool",
                      },
                      {
                        internalType: "bytes32",
                        name: "refUID",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes",
                        name: "data",
                        type: "bytes",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct AttestationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "attester",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedAttestationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiAttestByDelegation",
            outputs: [
              {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct MultiRevocationRequest[]",
                name: "multiRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData[]",
                    name: "data",
                    type: "tuple[]",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature[]",
                    name: "signatures",
                    type: "tuple[]",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct MultiDelegatedRevocationRequest[]",
                name: "multiDelegatedRequests",
                type: "tuple[]",
              },
            ],
            name: "multiRevokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiRevokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32[]",
                name: "data",
                type: "bytes32[]",
              },
            ],
            name: "multiTimestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                ],
                internalType: "struct RevocationRequest",
                name: "request",
                type: "tuple",
              },
            ],
            name: "revoke",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "bytes32",
                    name: "schema",
                    type: "bytes32",
                  },
                  {
                    components: [
                      {
                        internalType: "bytes32",
                        name: "uid",
                        type: "bytes32",
                      },
                      {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                      },
                    ],
                    internalType: "struct RevocationRequestData",
                    name: "data",
                    type: "tuple",
                  },
                  {
                    components: [
                      {
                        internalType: "uint8",
                        name: "v",
                        type: "uint8",
                      },
                      {
                        internalType: "bytes32",
                        name: "r",
                        type: "bytes32",
                      },
                      {
                        internalType: "bytes32",
                        name: "s",
                        type: "bytes32",
                      },
                    ],
                    internalType: "struct EIP712Signature",
                    name: "signature",
                    type: "tuple",
                  },
                  {
                    internalType: "address",
                    name: "revoker",
                    type: "address",
                  },
                ],
                internalType: "struct DelegatedRevocationRequest",
                name: "delegatedRequest",
                type: "tuple",
              },
            ],
            name: "revokeByDelegation",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "revokeOffchain",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes32",
                name: "data",
                type: "bytes32",
              },
            ],
            name: "timestamp",
            outputs: [
              {
                internalType: "uint64",
                name: "",
                type: "uint64",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
      };
  }
}
