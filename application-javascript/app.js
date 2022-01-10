/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');
const express = require('express')
const crypto = require('crypto')
 
const app = express();

const axios = require('axios').default;

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const channelName = 'ondc';
const chaincodeName = 'basic-product';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

app.listen('3000',()=>{
	console.log("Listening on port 3000")
})

app.post('/search', async function(req, res) {
	const search = req.body.intent;
	const uri = req.body.context.bap_uri
	res.send('ACK')
	onSearch(search, uri);
})
	
app.post('/select', async (req, res) => {
	const id = req.body.context.transaction_id
	const uri = req.body.context.bap_uri
	const order = req.body.order

	res.send('ACK')
	onSelect(id, uri, order)
})

app.post('/init', async (req, res) => {
	const id = req.body.context.transaction_id
	const uri = req.body.context.bap_uri
	const order = req.body.order

	res.send('ACK')
	onInit(id, uri, order)
})

app.post('/confirm', async (req, res) => {
	const id = req.body.context.transaction_id
	const uri = req.body.context.bap_uri
	const order = req.body.order

	res.send('ACK')
	onConfirm(id, uri, order)
})

app.get('/aggregation', async (req, res) => {
	await handleAggregation()
	res.send('ACK')
})

app.post('/users', async (req, res) => {
	const userName = req.body.userName

	try {
			// build an in memory object with the network configuration (also known as a connection profile)
			const ccp = buildCCPOrg1();
	
			// build an instance of the fabric ca services client based on
			// the information in the network configuration
			const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
	
			// setup the wallet to hold the credentials of the application user
			const wallet = await buildWallet(Wallets, walletPath);
	
			// in a real application this would be done on an administrative flow, and only once
			await enrollAdmin(caClient, wallet, mspOrg1);
	
			// in a real application this would be done only when a new user was required to be added
			// and would be part of an administrative flow
			await registerAndEnrollUser(caClient, wallet, mspOrg1, userName, 'org1.department1');
	
			// Create a new gateway instance for interacting with the fabric network.
			// In a real application this would be done as the backend server session is setup for
			// a user that has been verified.
			const gateway = new Gateway();
	
			try {
				// setup the gateway instance
				// The user will now be able to create connections to the fabric network and be able to
				// submit transactions and query. All transactions submitted by this gateway will be
				// signed by this user using the credentials stored in the wallet.
				await gateway.connect(ccp, {
					wallet,
					identity: userName,
					discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
				});
	
				// Build a network instance based on the channel where the smart contract is deployed
				const network = await gateway.getNetwork(channelName);
				
				res.send(`${userName} registered successfully!`)
			} finally {
				gateway.disconnect();
	}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
})

app.post('/product', async (req, res) => {
	const id = req.body.id
	const name = req.body.name
	const desc = req.body.desc
	const sp = req.body.sp
	const rp = req.body.rp
	const qty = req.body.qty
	const rating = req.body.rating
	const platform = req.body.platform

	const userName = req.body.userName

	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, userName, 'org1.department1');

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: userName,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			const Contract = network.getContract('basic-product')

			console.log('\n--> Submit Transaction: CreateProduct');

			await Contract.submitTransaction("CreateProduct", id, name, desc, sp, rp, qty, rating, userName, platform)
			
			res.send("Product added successfully")
			} finally {
				gateway.disconnect();
	}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
}
})

app.post('/getAgg', async (req, res) => {

	const userName = req.body.userName

	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, userName, 'org1.department1');

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: userName,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			const Contract = network.getContract('basic-agg')

			console.log('\n--> Submit Transaction: ReadAggregatedData');

			var result = await Contract.submitTransaction("ReadAggregatedData", "dataAgg")
			var resu = JSON.parse(result)

			console.log("Agg data called:", resu)

			res.send(resu)
			} finally {
				gateway.disconnect();
	}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
}
})

async function handleAggregation(){
	var result = []
	var DeliveryByMaxOrdersMoved = []
	var DeliveryWithMaxRating = []
	var DeliveryWithMinRating = []
	var SellerWithMaxRating = []
	var SellerWithMinRating = []
	var SalesBySeller = ""
	var SalesByProduct = ""
	await axios.get("http://localhost:3002/orders")
    .then(resp => result = resp.data)

		DeliveryByMaxOrdersMoved = getDeliveryByMaxOrdersMoved(result)
		DeliveryWithMaxRating = getDeliveryWithMaxRating(result)
		DeliveryWithMinRating = getDeliveryWithMinRating(result)
		SellerWithMaxRating = getSellerWithMaxRating(result)
		SellerWithMinRating = getSellerWithMinRating(result)
		SalesBySeller = getSalesBySeller(result)
		SalesByProduct = getSalesByProduct(result)
		console.log("===========================Aggregated Data=====================")
		console.log("DeliveryByMaxOrdersMoved:",DeliveryByMaxOrdersMoved[0],"\nFormat:", typeof(DeliveryByMaxOrdersMoved))
		console.log("DeliveryWithMaxRating:", DeliveryWithMaxRating)
		console.log("DeliveryWithMinRating:", DeliveryWithMinRating)
		console.log("SellerWithMaxRating:", SellerWithMaxRating)
		console.log("SellerWithMinRating:", SellerWithMinRating)
		console.log("SalesBySeller:", SalesBySeller)
		console.log("SalesByProduct:", SalesByProduct)

		try {
			// build an in memory object with the network configuration (also known as a connection profile)
			const ccp = buildCCPOrg1();
	
			// build an instance of the fabric ca services client based on
			// the information in the network configuration
			const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
	
			// setup the wallet to hold the credentials of the application user
			const wallet = await buildWallet(Wallets, walletPath);
	
			// in a real application this would be done on an administrative flow, and only once
			await enrollAdmin(caClient, wallet, mspOrg1);
	
			// in a real application this would be done only when a new user was required to be added
			// and would be part of an administrative flow
			await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
	
			// Create a new gateway instance for interacting with the fabric network.
			// In a real application this would be done as the backend server session is setup for
			// a user that has been verified.
			const gateway = new Gateway();
	
			try {
				// setup the gateway instance
				// The user will now be able to create connections to the fabric network and be able to
				// submit transactions and query. All transactions submitted by this gateway will be
				// signed by this user using the credentials stored in the wallet.
				await gateway.connect(ccp, {
					wallet,
					identity: org1UserId,
					discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
				});
	
				// Build a network instance based on the channel where the smart contract is deployed
				const network = await gateway.getNetwork(channelName);
	
				// Get the contract from the network.
				const aggContract = network.getContract('basic-agg')
	
				console.log('\n--> Submit Transaction: UpdateAggregatedData');

				await aggContract.submitTransaction("UpdateAggregatedData", "dataAgg", DeliveryByMaxOrdersMoved[0], DeliveryWithMinRating[0], DeliveryWithMaxRating[0], SellerWithMinRating[0], SellerWithMaxRating[0], SalesBySeller, SalesByProduct)
	
			} finally {
				gateway.disconnect();
		}
		} catch (error) {
			console.error(`******** FAILED to run the application: ${error}`);
		}
}

function getDeliveryByMaxOrdersMoved(result){
	var fulfillers = []
    var lookup = {}
    var max = 0
    var maxFulfiller = []
	for(var item, i = 0; item = result[i++];){
		var Id = item.Fulfillment.Id

		if(!(Id in lookup)){
			
			lookup[Id] = 1
			fulfillers.push(Id)
		}
		else{
			lookup[Id]++
		}
	}
	for(var item in lookup){
		if(lookup[item] > max){
			max = lookup[item]
			maxFulfiller = [item]
		}
		else if(lookup[item] === max){
			maxFulfiller.push(item)
		}
	}
	return maxFulfiller
}

function getDeliveryWithMinRating(result){
	var fulfillers = []
    var lookup = {}
    var rating = {}
    var min = 5
    var minFulfiller = []
	for(var item, i = 0; item = result[i++];){
		var Id = item.Fulfillment.Id

		if(!(Id in lookup)){
			
			lookup[Id] = 1
			fulfillers.push(Id)
		}
	}
	for(var item, i = 0; item = result[i++];){
		var Id = item.Fulfillment.Id

		if(!(Id in rating)){
			rating[Id] = [item.Fulfillment.Rating]
		}
		else{
			rating[Id].push(item.Fulfillment.Rating)
		}
	}
	for(var fulfiller in rating){
		var avg = rating[fulfiller].reduce( ( p, c ) => p + c, 0 ) / rating[fulfiller].length;
		if(avg === min){
			minFulfiller.push(fulfiller)
		}
		else if(avg < min){
			console.log("Deliver:"+fulfiller+"\nRating:"+avg)
			min = avg;
			minFulfiller = [fulfiller]
		}
		
	}
	return minFulfiller
}

function getDeliveryWithMaxRating(result){
	var fulfillers = []
    var lookup = {}
    var rating = {}
    var max = 0
    var maxFulfiller = []
	for(var item, i = 0; item = result[i++];){
		var Id = item.Fulfillment.Id

		if(!(Id in lookup)){
			
			lookup[Id] = 1
			fulfillers.push(Id)
		}
	}
	for(var item, i = 0; item = result[i++];){
		var Id = item.Fulfillment.Id

		if(!(Id in rating)){
			rating[Id] = [item.Fulfillment.Rating]
		}
		else{
			rating[Id].push(item.Fulfillment.Rating)
		}
	}
	for(var fulfiller in rating){
		var avg = rating[fulfiller].reduce( ( p, c ) => p + c, 0 ) / rating[fulfiller].length;
		if(avg === max){
			maxFulfiller.push(fulfiller)
		}
		else if(avg > max){
			//console.log("Deliver:"+fulfiller+"\nRating:"+avg)
			max = avg;
			maxFulfiller = [fulfiller]
		}
		
	}
	return maxFulfiller
}

function getSellerWithMinRating(result){
	var sellers = []
    var lookup = {}
    var rating = {}
    var min = 5
    var minSeller = []
	for(var item, i = 0; item = result[i++];){
		var Id = item.Seller.Id

		if(!(Id in lookup)){
			
			lookup[Id] = 1
			sellers.push(Id)
		}
	}
	for(var item, i = 0; item = result[i++];){
		var Id = item.Seller.Id

		if(!(Id in rating)){
			rating[Id] = [item.Seller.Rating]
		}
		else{
			rating[Id].push(item.Seller.Rating)
		}
	}
	for(var seller in rating){
		var avg = rating[seller].reduce( ( p, c ) => p + c, 0 ) / rating[seller].length;
		if(avg === min){
			minSeller.push(seller)
		}
		else if(avg < min){
			min = avg;
			minSeller = [seller]
		}
	}
	return minSeller
}

function getSellerWithMaxRating(orders){
	var sellers = []
    var lookup = {}
    var rating = {}
    var max = 0
    var maxSeller = []
	for(var item, i = 0; item = orders[i++];){
		var Id = item.Seller.Id

		if(!(Id in lookup)){
			
			lookup[Id] = 1
			sellers.push(Id)
		}
	}
	for(var item, i = 0; item = orders[i++];){
		var Id = item.Seller.Id

		if(!(Id in rating)){
			rating[Id] = [item.Seller.Rating]
		}
		else{
			rating[Id].push(item.Seller.Rating)
		}
	}
	for(var seller in rating){
		var avg = rating[seller].reduce( ( p, c ) => p + c, 0 ) / rating[seller].length;
		if(avg === max){
			maxSeller.push(seller)
		}
		else if(avg > max){
			max = avg;
			maxSeller = [seller]
		}
	}
	return maxSeller
}

function getSalesBySeller(orders){
	var sellers = []
    var lookup = {}
    var totOrders = {}

	for(var item, i = 0; item = orders[i++];){
		var Id = item.Seller.Id

		if(!(Id in lookup)){
			
			lookup[Id] = 1
			sellers.push(Id)
		}
	}
	for(var item, i = 0; item = orders[i++];){
		var Id = item.Seller.Id

		if(!(Id in totOrders)){
			totOrders[Id] = 1
		}
		else{
			totOrders[Id]++
		}
	}
	var total = JSON.stringify(totOrders)
	return total
}

function getSalesByProduct(orders){
	var products = []
    var lookup = {}
    var totOrders = {}

	for(var item, i = 0; item = orders[i++];){
		var product = item.Items[0].Id

		if(!(product in lookup)){
			
			lookup[product] = 1
			products.push(product)
		}
	}
	for(var item, i = 0; item = orders[i++];){
		var product = item.Items[0].Id

		if(!(product in totOrders)){
			totOrders[product] = 1
		}
		else{
			totOrders[product]++
		}
	}
	var total = JSON.stringify(totOrders)
	return total
}

async function onSearch(search, uri) {
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			const contract = network.getContract(chaincodeName);

			console.log("==============================OnSearch==============================")

			console.log('\n--> Evaluate Transaction: SearchProductByName, function returns an asset with a given assetID');
			const result = await contract.evaluateTransaction('SearchProductByName', search);
			console.log(result)
			var resu = JSON.parse(result)
			console.log(`*** Result: ${resu}`);
			await axios({
				method: 'post',
				url: `${uri}/on_search`,
				data: resu,
				}).then(function (response) {
				console.log(response.data)
				});
		} finally {
			gateway.disconnect();
	}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}

async function onSelect(id, uri, order) {
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);

			console.log("==============================OnSelect==============================")

			// Get the contract from the network.
			const contract = network.getContract(chaincodeName);
			const orderContract = network.getContract('basic-order')
			console.log(order)
			console.log('\n--> Evaluate Transaction: SearchPriceById, function returns an asset with a given assetID');
			const result = await contract.evaluateTransaction('GetPriceById', order.items.id);
			var price = result.toString()
			order.items.quote = price
			console.log("Price:", price)
			const hash = crypto.createHash('sha256', order).digest('hex')

			await orderContract.submitTransaction("CreateOrder", id, hash)

			console.log(`*** Result: ${result}`);
			await axios({
				method: 'post',
				url: `${uri}/on_select`,
				data: order,
				}).then(function (response) {
				console.log(response.data)
				});
		} finally {
			gateway.disconnect();
	}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}

async function onInit(id, uri, order) {
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			const orderContract = network.getContract('basic-order')

			console.log("==============================OnInit==============================")

			console.log('\n--> Evaluate Transaction: SearchPriceById, function returns an asset with a given assetID');
			order.payment = "CoD"
			const hash = crypto.createHash('sha256', order).digest('hex')
			console.log(hash)
			await orderContract.submitTransaction("UpdateOrder", id, hash)


			await axios({
				method: 'post',
				url: `${uri}/on_init`,
				data: order,
				}).then(function (response) {
				console.log(response.data)
				});
		} finally {
			gateway.disconnect();
	}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}

async function onConfirm(id, uri, order) {
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);

			// Get the contract from the network.
			const orderContract = network.getContract('basic-order')

			console.log("==============================OnConfirm==============================")

			console.log('\n--> Evaluate Transaction: SearchPriceById, function returns an asset with a given assetID');
			var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			var dateTime = date+' '+time;

			order.updated_at = dateTime
			order.Id = id
			const hash = crypto.createHash('sha256', order).digest('hex')
			console.log(hash)
			await orderContract.submitTransaction("UpdateOrder", id, hash)

			await axios({
				method: 'post',
				url: `${uri}/on_confirm`,
				data: order,
				}).then(function (response) {
				console.log(response.data)
				});

			await axios.post("http://localhost:3001/orders/", { order })
		} finally {
			gateway.disconnect();
	}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
	}
}


