const express = require('express')
 
const app = express();
 
const axios = require('axios').default;
 
const bodyParser = require('body-parser')
app.use(bodyParser.json())
 
async function main(){
 
await axios.post("http://localhost:3000/getAgg", {
    userName: "seller13"
})
.then(res => console.log(res.data))
 
}
 
main();