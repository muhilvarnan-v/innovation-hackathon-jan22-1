## **ONDC Hackathon - Challenge 10**

## **Solutions for Web 3.0**

## **Description**

The objective of this challenge is to create e-commerce solutions for the decentralized web (Web 3.0)

**Requirements**

The requirements for this challenge are defined below.

Perform a technology demonstration of a decentralized beckn protocol-enabled network that

1. Creates smart commerce contracts between buyer and seller.
2. Rewards edge computation done for discovery, ordering and fulfillment and post-fulfillment services via cryptocurrencies
3. Validates transactions via consensus protocols like PoW, PoS, DPoS, PoSpace etc

Please note that this solution should be accompanied by detailed documentation containing the architecture and user guide.

## **Approach**

We have used the following components to address the mandatory and optional requirements of the challenge

1. CORD - Layer 1 Network Project

   [GitHub - dhiway/cord at ondc-hackathon](https://github.com/dhiway/cord/tree/ondc-hackathon)

2. CORD.js - Network SDK

   [GitHub - dhiway/cord.js at ondc-hackathon](https://github.com/dhiway/cord.js/tree/ondc-hackathon)

3. SubQL - GraphQL interface to index, transform, and query CORD chain data.

   [GitHub - dhiway/cord-subql at ondc-hackathon](https://github.com/dhiway/cord-subql/tree/ondc-hackathon)

4. CORD Network Explorer

   [CORD Apps](https://apps.cord.network/#/explorer)

CORD is a purpose-built decentralised infrastructure designed from the ground up to be a global public utility and enable a trust framework. It is designed to simplify the management of information, making it easier for owners to control; agencies and businesses to discover, access and use data to deliver networked public services. It provides a transparent history of information and protects it from unauthorised tampering from within or without the system.

While sharing information securely among interested parties within an ecosystem has always been possible, CORD offers an enticing path toward more efficient operations, more responsive service, and enhanced data security among a group of participants that may not necessarily have a pre-existing trust relationship.

The cryptographically secure, tamper-proof ledger along with Decentralised Identifiers (DID), Verifiable Credentials (VC) and content-addressed storage creates a higher level of assurance for the information streams. This model enables data availability, discovery, consent receipts, integration, security, and compliance to ensure the right information is delivered to the right resource at the right time — and ensure the information is being used for the right reason

The use of the CORD network would reduce the risk of unauthorised access (through strong encryption) and data manipulation (through tamper-proof audit trails). CORD does not store personally identifiable information (PII) or the business data linked to the transaction on the chain. Developers and enterprises can use the CORD network to create applications that run on top of the network or can use the project to launch their own network.

It provides a stable, trustworthy network for institutions and developers to rely on an open-standards-driven value exchange protocol that is owned by everyone participating and not the monopoly of a single company. CORD creates new possibilities in addressing trust gaps, managing the authenticity of transactions, and exchanging value at scale.

A paper explaining the [CORD Network Operations](./CORD_Lightpaper_v1.pdf) is added to the repo.

### **Assumptions**

- CORD.network is assumed as the Layer 1 network for our efforts. The data is kept off-chain using open-standards which will make it easy for contributors to use it with other networks or build bridges with other networks
- A product Pallet to the CORD chain is added, which would handle the challenge requirements.
- We are not using smart contracts as the built-in data structures are capable of handling the interaction requirements. We couldn’t implement the escrow transaction model between the buyer and seller due to the tight schedule to complete the product pallet. We will be enhancing the pallet with this feature soon. The current transaction will only charge the network fees in native crypto tokens.

## **Network Operations**

### **Consensus**

CORD adopts the Web3 foundation variant of PoS called Nominated Proof-of-Stake (NPoS), with design choices based on first principles and having security, fair representation and satisfaction of users, and efficiency as driving goals.

CORD uses a Hybrid consensus mechanism that consists of Blind Assignment for Blockchain Extension protocol (BABE): a block production mechanism of the chain that provides probabilistic finality and GHOST-based Recursive Ancestor Deriving Prefix Agreement (GRANDPA) which provides provable, deterministic finality and works independently from BABE.

Networks using the Proof-of-Stake consensus protocol include Polkadot, Cardano, EOS, Tezos, and Cosmos, among many others. While similar in spirit, the approaches in these networks and CORD vary in terms of design choices such as the incentive structure, the number of validators elected, and the election rule used to select them.

### **Chain Nodes & Data Synchronisation**

A blockchain's growth comes from a _genesis block_, _extrinsics_, and _events_.

When a validator seals block 1, it takes the blockchain's state at block 0. It then applies all pending changes on top of it, and emits the events that are the result of these changes. Later, the state of the chain at block 1 is used in the same way to build the state of the chain at block 2, and so on. Once two-thirds of the validators agree on a specific block being valid, it is finalized.

An **archive node** keeps all the past blocks. An archive node makes it convenient to query the past state of the chain at any point in time. Finding out what an account's balance at a certain block was, or which extrinsic resulted in a certain state change are fast operations when using an archive node.

Archive nodes are used by utilities that need past information - like block explorers, network applications, and others. They need to be able to look at past on-chain data.

A **full node** is _pruned_: it discards all finalized blocks older than a configurable number except the genesis block: This is 256 blocks from the last finalized one, by default. A node that is pruned this way requires much less space than an archive node.

Full nodes allow applications to read the current state of the chain and to submit and validate extrinsic directly on the network without relying on a centralized infrastructure provider.

## **Scalability**

The network is built to support population-scale public digital services. The hybrid consensus model separates block production from finality on those blocks. Our goals for the block production layer are to be fast and probabilistically safe. The finality gadget is asynchronously safe, provides accountable safety, and is able to finalize many blocks at once.

The transactions received by the network are processed, validated, finalised and replicated to every participating network node in 6 seconds. The modular architecture allows optimisation at different levels of this flow, based on the use-case demands. We are quite confident to scale the network to support more than a million active network applications.

## **Limits**

We are in the process of bootstrapping a public-permissioned network. The network that we are running currently is private and is used by more than 1300 organisations. We are looking for network partners to launch the test-net towards end of next month.

## **What Next?**

We plan to continue working on enhancing the network capabilities to support the ONDC ecosystem requirements. Looking forward to seeing ONDC, Beckn and other ecosystem organisations joining and support our efforts.
