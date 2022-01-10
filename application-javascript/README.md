# ONDC Hackathon Use Case 9: Distributed Ledger for Network

### **Prerequisites for Network Setup**
**Run the below script to install all Hyperledger Fabric dependencies**
```
curl -sSL https://bit.ly/2ysbOFE | bash -s
```

### Setting up the Network
```
bash createNetwork.sh
```

### Bring the API server up
```
cd application-javascript
npm install
node app.js
```

## User Journies

### **1. Journey 1 : Onboarding of a Seller/Seller Platform**
#### Registration with Blockchain network and allocation of an unique account (Wallet in hyperledger)

Edit the seller ID in *enrollUser.js*
Open and new terminal and run the below:-
```
node enrollUser.js
```
[![Journey 1]](https://drive.google.com/file/d/1aReiB5FTqW_N1yTE0RrKANpcvXao1Hqo/view?usp=sharing)



### **2. Journey 2 : Seller Adding the catalogue information (included inventory information )**
Edit *createProduct.js* to add details of new product and seller ID
```
node createProduct.js
```
[![Journey 2]](https://drive.google.com/file/d/1hBBesaLLQ0XAn7O3l37mno1t6yaeXjK0/view?usp=sharing)



### **3. Journey 3: Aggregate information as is based on dummy transaction**
Aggregation data can be updated manually using the following
```
node updateAgg.js
```
[![Journey 3]](https://drive.google.com/file/d/1hZ7H8-zpCc2pyp7A3LJ41S23T0xu_dNf/view?usp=sharing)

### **4. Journey 4: Information visible to seller (on Chain and off chain)**
[![Journey 4]](https://drive.google.com/file/d/16ia8A-ivYLcnDCGlUyFMOepXCZtdz4Ph/view?usp=sharing)

### **5. Journey 5: Performing dummy transaction just by adding records**
The Discovery and Order phase is simulated in *method.js*
Run it on the terminal using:-
```
node method.js
```
[![Journey 5]](https://drive.google.com/file/d/1016MW5Gi_yp2uqHIYTawcd0gR6Z4nM1P/view?usp=sharing)

This creates a mock client who is hosting callback APIs.
These are concatenated to provide the whole journey in one call.

* On successful creation of order (on_confirm), we update the aggregation data on the ledger as well

### **6. Journey 6: Aggregate position check**
Run the below to read Aggregation Data from Ledger
```
node readAgg.js
```
[![Journey 6]](https://drive.google.com/file/d/1d5OZiYmrRbtgk1asf-aYH6vz8K02QmDV/view?usp=sharing)


### **7. Journey 7: Adding new Seller in the network**
Edit the seller ID in *enrollUser.js*
Open and new terminal and run the below:-
```
node enrollUser.js
```
[![Journey 7]](https://drive.google.com/file/d/1TgujloWOJ5VANAS75LD7OS9HgkYTg8wd/view?usp=sharing)

### **8. Journey 8: View of aggregate information once seller joins the network**
Edit readAgg.js to call it using credentials of new Seller
```
node readAgg.js
```
[![Journey 8]](https://drive.google.com/file/d/1ZqcqUFfvqkD6JyRyb3uwrjoPbAQ_T20s/view?usp=sharing)

## Assumptions
1. Transactions are already captured in blockchain between buyers and sellers
2. Transaction information captures 80% details of Beckn protocol specs across its lifecycle ie. Search,Order,Fulfillment and Post fulfillment
3. The transaction happen between buyer platform and Seller platform or directly with Seller.
4. Seller can directly enroll into the blockchain network and start particpating in the ecosystem.
5. Seller once onboarded as peer in the blockchain network can be discoverable at Buyer platform
6. We assumed a registry feature in blockchain which provide user friendly Virtual addressed to fetch Seller information at aggregated level .
7. For time being, we allowed seller to add inventory details in the catalogue itself, in subsequent stages this will be seperated out

## Extensibility (to other use cases)
1. Credit enablement of Sellers by adding creditors in the blockchain network
2. Seller ability to discover the delivery partners which delivers fast to a particular location to provide enhance services to end users
3. Stock management and inter-seller trading
4. Token to enable credit between particpants in the blockchain network
5. Insight services for buyers and platform to make choices during purchase or order

## Scalability
We have leveraged two ways to achieve scalability in the solution:



1. Gossip protocol :Peers are always catching up to current orderer's block height, regardless of whether the peer is milliseconds, seconds, or minutes behind current orderer's block height, it is considered 'healthy' in that it can accept chaincode requests. However, the further behind the peer is, the more likely it is that its endorsements will ultimately get invalidated due to staleness, therefore it is good practice to send endorsement proposals to peers with maximum block height. Service Discovery returns height of known peers for this purpose, also you can query the peers height directly from an SDK, or look at the ledger_blockchain_height metric

2. Leveraging the principle of Onchain and off chain data in the blockchain and roll ups:
   - Onchain -- Transaction hash (SHA 256) , Transaction ID, Buyer of Selller core information, Rolled up- Aggregated information at seller level
   - Offchain - Transaction details
   - Platform node - is aggregating the information at each nodes and making it avaialble to the network