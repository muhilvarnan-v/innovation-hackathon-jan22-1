const express = require('express')
 
const app = express();
 
const axios = require('axios').default;
 
const bodyParser = require('body-parser')
app.use(bodyParser.json())
 
async function main(){
 
await axios.get("http://localhost:3000/aggregation")
.then(res => console.log(res.data))
 
}
 
main();