## **ONDC Hackathon - Challenge 10**

## **Distributed Ledger for Network**

## **Description**

The objective of this challenge is to create and maintain a distributed ledger of open data in ONDC.

**Requirements**

The requirements for this challenge are defined, under mandatory & optional categories, below.

**Mandatory**

1. Design a distributed ledger for a network that sources events, at different levels of granularity, from different nodes of the network, aggregates the data by applying mathematical transforms and synchronizes the resultant data across the nodes of the network; examples of data that may be considered for sourcing include ratings data, aggregate data for sales and inventory, etc.
2. The design should consider a network with at least 1 million nodes.
3. Develop an open standards based reusable software component that implements (a) above.

**Optional**

1. Extend the distributed ledger in (a) above to handle exception & edge cases, such as a node joining the network at any time and synchronizing with the latest aggregates, a node becoming offline for sometime, having its aggregates synchronized once it becomes online, etc..

## Approach

We have used the following components to address the mandatory and optional requirements of the challenge

1. CORD - Layer 1 Network Project

   [GitHub - dhiway/cord at ondc-hackathon](https://github.com/dhiway/cord/tree/ondc-hackathon)

1. CORD.js - Network SDK

   [GitHub - dhiway/cord.js at ondc-hackathon](https://github.com/dhiway/cord.js/tree/ondc-hackathon)

1. SubQL - GraphQL interface to index, transform, and query CORD chain data.

   [GitHub - dhiway/cord-subql at ondc-hackathon](https://github.com/dhiway/cord-subql/tree/ondc-hackathon)

CORD is a purpose-built decentralised infrastructure designed from the ground up to be a global public utility and enable a trust framework. It is designed to simplify the management of information, making it easier for owners to control; agencies and businesses to discover, access and use data to deliver networked public services. It provides a transparent history of information and protects it from unauthorised tampering from within or without the system.

While sharing information securely among interested parties within an ecosystem has always been possible, CORD offers an enticing path toward more efficient operations, more responsive service, and enhanced data security among a group of participants that may not necessarily have a pre-existing trust relationship.

The cryptographically secure, tamper-proof ledger along with Decentralised Identifiers (DID), Verifiable Credentials (VC) and content-addressed storage creates a higher level of assurance for the information streams. This model enables data availability, discovery, consent receipts, integration, security, and compliance to ensure the right information is delivered to the right resource at the right time — and ensure the information is being used for the right reason

The use of the CORD network would reduce the risk of unauthorised access (through strong encryption) and data manipulation (through tamper-proof audit trails). CORD does not store personally identifiable information (PII) or the business data linked to the transaction on the chain. Developers and enterprises can use the CORD network to create applications that run on top of the network or can use the project to launch their own network.

It provides a stable, trustworthy network for institutions and developers to rely on an open-standards-driven value exchange protocol that is owned by everyone participating and not the monopoly of a single company. CORD creates new possibilities in addressing trust gaps, managing the authenticity of transactions, and exchanging value at scale.

### **Assumptions**

- CORD.network is assumed as the Layer 1 network for our efforts. The data is kept off-chain using open-standards which will make it easy for contributors to use it with other networks or build bridges with other networks
- A product Pallet to the CORD chain is added, which would handle the challenge requirements

## Solution Overview

CORD runtime is composed of several smaller components called pallets. A pallet contains a set of types, storage items, and functions that define a set of features and functionality for a runtime.

We have created a new pallet to meet the challenge 9 and 10 requirements. This pallet is only intended to demonstrate the use-case driven extension capabilities of the runtime. For production environments, this pallet should be broken down into multiple pallets (e.g.: products, orders, ratings, sellers, approved applications/nodes etc)

This solution does not block the transaction flow handed at the application layer. The network reads can be optimised by having a read/archive node along with the application infrastructure or the application can use an ready to use end-point by a service provider.

The onchain data structure for the product pallet has 3 components.

1. Tracking the Product, Order and Rating Details - these endpoints will be used to stream data into the network or query the state of the data exchanged by the network applications.
2. Tracking the transaction Links - an order is linked to a store listing, a listing is linked to a product, a rating is linked to the order, which inturn is linked to the product etc
3. Tracking the history of transactions - captures the history of changes that happened to a transaction. eg: change of shipping address after placing an order, changes to product availability, changes to application/node permissions etc.

### Product Transaction Data Structure - OnChain

```jsx
Product {
  id: 'Unique Persistent ID',
  hash: 'Hash of the data',
  cid: 'represents the offchain data location',
  store_id: 'Uniqe Store ID',
  schema: 'Schema to validate the data and check permissions to anchor',
  price: 'price of the product (kept it without encryption for demo)',
  rating: 'capture rating inputs',
  link: 'linked parent transation',
  creator: 'Identity used to sign and submit this transaction',
  status: 'state of the transaction'
}
```

Below is an example of the product transaction data structure after processing multiple inputs received from different network participants.

```jsx
Product {
  id: '0x28426e183dabd69053329d8330f7c2689e38c6e9ff4c3026decf7f3975333a8d',
  hash: '0xbe237cddb7f0f4bf0aa4028c997a7988bef16a3b2df96d9f1f3eac19decdceba',
  cid: 'bagqoiava4qbcb5kpepbgkwj5z4etxw7fvyyrmkt27qc4ibuf2oio4zz72z6sst5m',
  store_id: '0x5381ccc48654ecec36081ef27b244d13b86210927b0c2ea2f73fa34dc08bd43e',
  schema: '0xda247638584942f7fcba76d1f9e91ac0973847a561f7b0fc217ba48633c041eb',
  price: 135000,
  rating: 5,
  link: '0x0efa1bd3c75ef8fe8f6589803ea26b27dc982768a3615efa8480a024bd344ae7',
  creator: '3vxwGjMuAkKYe4kiiNzCQHcj7nvaHN6JVckSu2rrjYnYRP8g',
  status: true
}
```

The linked transaction data structure extends the capability to construct transaction-level micro-chains, especially for reads and validations.

The off-chain data also goes through a transformation to support the source data integrity. The cryptographic techniques are applied to ensure data ownership and integrity. The techniques uses also protect data from using it for replay attacks.

Here is an example of the transformed data referenced by the chain transaction shown above.

```jsx
ContentStream {
  id: 'cord:stream:0x28426e183dabd69053329d8330f7c2689e38c6e9ff4c3026decf7f3975333a8d',
  creator: '3vxwGjMuAkKYe4kiiNzCQHcj7nvaHN6JVckSu2rrjYnYRP8g',
  holder: undefined,
  content: Content {
    schemaId: '0xda247638584942f7fcba76d1f9e91ac0973847a561f7b0fc217ba48633c041eb',
    contents: {
      name: 'Sony OLED 55 Inch Television',
      description: 'Best Television in the World',
      countryOfOrigin: 'India',
      gtin: '0x2dc9ee0e124016c061999b6c6e0f15ee3a29d4add57d22754d8ad0ca64223896',
      brand: 'Sony OLED',
      manufacturer: 'Sony',
      model: '2022',
      sku: '0x8cad94a5071ed88afda0a027ab6bdda136464740355d4f228f83485c8e8ddfa1'
    },
    creator: '3vxwGjMuAkKYe4kiiNzCQHcj7nvaHN6JVckSu2rrjYnYRP8g'
  },
  contentHashes: [
    '0x10b70edfcf4e5f2d93b0efdc8908921c73e98773053ba36a4dca910ea136ffc0',
    '0x5b5aa39a5ba49817878e3e0a5440f5dcd753a13f176b04b2b0f32658764c8867',
    '0x69eaea39de4f911d79e7e0fadc58eb1173e7fae3474975636f0f24c8d3bb5ced',
    '0x6b4ea4f745aa4b7936096f99fb64dc8f097a8212ffa24a8550eac878b93a09a1',
    '0x77e2d4810e360e5d43cc15e90eea43af59363d491573c01f42484b22cb4b6bd6',
    '0x9f7c933fbad2b7fffe35670d13c56220e689f6f154f5ebc9158c61570d62f7c0',
    '0xc4d21d6f27c97d9d2e602f5fd0e88158bffa2ee3752360c41df4546049dfc697',
    '0xcdc9b8c9a934323fb4b2b6a3de741f09d4b0168cf3310ee851e15ffe0ff5d17c'
  ],
  contentNonceMap: {
    '0x77f0db58c0e649c18367e0c5465e5d76a0d63c80b6803d19728341ff82dd921b': '091f991d-bb90-4e8a-a87d-b41fd689cfe1',
    '0xc1fc3bb501caa62ab40521b1bb34e61267f1145f513c016e1801cc739e7c2c5a': 'b466b658-8e92-4461-b166-6e3a9ec99dbc',
    '0x9b084853ae7d7936afe0b956121208fcfa8cee71d07585d351450b5b7d18c843': '68dcf6bf-e09d-4930-b0b1-67d5c9f06aa4',
    '0x786e18d47e8b46816dd4cb4e099bf7bf5af9c15e80e6f4bcaefb1cd976a43327': '24d323b1-7df1-4ebd-b144-4d5d0aadae14',
    '0x80f283d413a58787cab7d60712a0f3f73df0d5275becb9232e7f031e70ae4237': '24f19981-bdb0-4e86-be66-22bb8b40009b',
    '0xe9190eee5e753a99b3c2f77e214d987af16c93f6c6ca8bf9ebb6620071145b1a': 'e5dae80d-6fbf-4ef5-a673-786aa9f9bb91',
    '0xc0cd3c8e22be082dfe573713dfa40a9e91a126cbb92f2bef87d79f96c5e925b0': '03c1b371-d5fb-4508-979f-125ac4835838',
    '0xc8bb94aad78eeb568921de7da093beb4f19dded84d57151fc2d0427a72ccbb97': '758b5067-1763-4f03-aa5d-56f5d0df97af'
  },
  proofs: [],
  creatorSignature: '0x01ca9b8cab40987ddb31955ea053de7a750e11c0401860c12e68e0c9d05d07bf049f7b61019b6420b10db8e787a9a3e16dfe2c6c5ca3a487f4c22070941f1b258e',
  contentHash: '0xbe237cddb7f0f4bf0aa4028c997a7988bef16a3b2df96d9f1f3eac19decdceba',
  link: '0x0efa1bd3c75ef8fe8f6589803ea26b27dc982768a3615efa8480a024bd344ae7'
}
```

The proofs[] structure is to create data structures with linked proofs. for eg: a product listing with a linked proof issued by the manufacture establishing the seller as an authorised reseller.

## Demo Flow

1. Register Identities
   1. NetworkAuthor - with Tokens
   2. Product Owner - with Tokens
   3. SellerOne - No Tokens (transactions signed by SellerOne and submitted to the network through Network Author)
   4. Sellertwo - No Tokens (transactions signed by SellerTwo and submitted to the network through Network Author)
   5. BuyerOne - No Tokens (transactions signed by BuyerTwo and submitted to the network through Network Author)
   6. BuyerTwo - No Tokens (transactions signed by BuyerTwo and submitted to the network through Network Author)
2. Register Product
   1. Product Schema - Schema anchored by Product Owner
   2. Add Products - Products anchored by Product Owner
   3. Delegate Schema to SellerOne - This makes SellerOne an authorised seller as he can now create a store listing linked to this product.
3. Store Listings
   1. SellerOne - List Products
   2. SellerOne transactions should suceed
   3. SellerTwo - Trying to list products - Should Fail verification
4. Place Order
   1. Buyer One - Places order.
5. Place Ratings
   1. BuyerOne - Provide for the orders placed
   2. BuyerOne - Provide an invalid rating - above 5 - Should fail verification
   3. BuyerTwo - Provide ratings for an order - Should fail Verification as he never ordered the product.

### Demo Setup

Assumption:

- Expection is your laptop has `[yarn` tool](https://yarnpkg.com/) installed
- Have our [Web console to watch Events](https://apps.cord.network/) open

```bash
git clone https://github.com/dhiway/innovation-hackathon-jan22 hackathon
cd hacathon
yarn
yarn demo;

```

While the code is running, you can watch the events populating on the web console.

### GraphQL

[GraphQL Playground](https://query.cord.network/)

1. List total products hosted by the network

   ```jsx
   query {
     products {
       totalCount
     }
   }
   ```

2. List total storefronts

   ```jsx
   query {
     listings {
       totalCount
     }
   }
   ```

3. List Unique products quantity by store

   ```jsx
   query {
      stores { nodes { id, productsByListingStoreIdAndProductId {nodes {id}}}}
   }
   ```

4. List total orders

   ```jsx
   query {
     orders {
       totalCount
     }
   }
   ```

5. Summary of orders by stores and products

   ```jsx
   query {
      stores(filter: {totalOrders: {greaterThan:0}}) { nodes { id, totalRating, totalOrders}}
      products(filter: {totalOrders: {greaterThan:0}}) { nodes { id, rating, totalRating, totalOrders}}
   }
   ```

6. Store ratings

   ```jsx
   query {
      stores { nodes { id, totalRating, totalOrders}}
   }
   ```

7. Aggregated Network Level Product ratings

   ```jsx
   query {
      products { nodes { id, rating, totalRating, totalOrders}}
   }
   ```

** NOTE **: CORD does not store personally identifiable information (PII) or the business data linked to the transaction on the chain.


## Network Operations

### **Consensus**

CORD adopts the Web3 foundation variant of PoS called Nominated Proof-of-Stake (NPoS), with design choices based on first principles and having security, fair representation and satisfaction of users, and efficiency as driving goals.

CORD uses a Hybrid consensus mechanism that consists of Blind Assignment for Blockchain Extension protocol (BABE): a block production mechanism of the chain that provides probabilistic finality and GHOST-based Recursive Ancestor Deriving Prefix Agreement (GRANDPA) which provides provable, deterministic finality and works independently from BABE.

Networks using the Proof-of-Stake consensus protocol include Polkadot, Cardano, EOS, Tezos, and Cosmos, among many others. While similar in spirit, the approaches in these networks and CORD vary in terms of design choices such as the incentive structure, the number of validators elected, and the election rule used to select them.

### **Chain Nodes & Data Synchronisation**

A blockchain's growth comes from a *genesis block*, *extrinsics*, and *events*.

When a validator seals block 1, it takes the blockchain's state at block 0. It then applies all pending changes on top of it, and emits the events that are the result of these changes. Later, the state of the chain at block 1 is used in the same way to build the state of the chain at block 2, and so on. Once two-thirds of the validators agree on a specific block being valid, it is finalized.

An **archive node** keeps all the past blocks. An archive node makes it convenient to query the past state of the chain at any point in time. Finding out what an account's balance at a certain block was, or which extrinsic resulted in a certain state change are fast operations when using an archive node.

Archive nodes are used by utilities that need past information - like block explorers, network applications, and others. They need to be able to look at past on-chain data.

A **full node** is *pruned*: it discards all finalized blocks older than a configurable number except the genesis block: This is 256 blocks from the last finalized one, by default. A node that is pruned this way requires much less space than an archive node.

Full nodes allow applications to read the current state of the chain and to submit and validate extrinsic directly on the network without relying on a centralized infrastructure provider.

## **Scalability**

The network is built to support population-scale public digital services. The hybrid consensus model separates block production from finality on those blocks. Our goals for the block production layer are to be fast and probabilistically safe. The finality gadget is asynchronously safe, provides accountable safety, and is able to finalize many blocks at once.

The transactions received by the network are processed, validated, finalised and replicated to every participating network node in 6 seconds. The modular architecture allows optimisation at different levels of this flow, based on the use-case demands. We are quite confident to scale the network to support more than a million active network applications.

## **Limits**

* The new pallet code is not ready for production.
* We use websocket technology with express.js code, which is known to be scalable to millions of endpoints, but we haven't run the benchmark ourselves.

## **What Next?**

We plan to continue working on enhancing the pallet/s capabilities to support the ONDC ecosystem requirements. Happy to have contributors joining the project to add new features or enhance the functionalities.
