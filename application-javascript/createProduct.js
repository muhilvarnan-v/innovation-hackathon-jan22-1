const express = require('express')
 
const app = express();
 
const axios = require('axios').default;
 
const bodyParser = require('body-parser')
app.use(bodyParser.json())
 
async function main(){
 
await axios.post('http://localhost:3000/product', {
    id: "008",
	name: "Plate",
	desc: "set of 6",
	sp: 250,
	rp: 220,
	qty: 30,
	rating: 3.0,
    userName: "seller6",
	platform: "Flipkart"
})
.then(res => console.log(res.data))
}
 
main();