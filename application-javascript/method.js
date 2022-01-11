const express = require('express')

const app = express();

const axios = require('axios').default;


const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.listen('3100', () => {
    console.log('listening on 3100')
})

app.post('/on_search', async function(req, res, next){
    
    var data = req.body[0].id
    console.log(data)
    
    res.send('ACK')    
    const query = `{"context":{"transaction_id":"004", "bap_uri":"http://localhost:3100"},"order":{"items":{"id": "${data}"}}}`

    select(query);
} )

app.post('/on_select', async function(req, res, next){
    
  var data = req.body
  
  resu = JSON.stringify(data)
  
  res.send('ACK') 
  
  const query = `{"context":{"transaction_id":"004", "bap_uri":"http://localhost:3100"}, "order": ${resu} }`

  
  init(query);
} )

app.post('/on_init', async function(req, res, next){
    
  var data = req.body

  resu = JSON.stringify(data)
  
  res.send('ACK')   

  const query = `{"context":{"transaction_id":"004", "bap_uri":"http://localhost:3100"}, "order": ${resu} }`
  
  confirm(query);
} )

app.post('/on_confirm', async function(req, res, next){
    
  var data = req.body
  console.log(data)
  console.log("Order Placed Successfully")
  
  res.send('ACK')    
} )

 async function search(){


    var obj = '{"intent":"Cup", "context":{"bap_uri":"http://localhost:3100"}}'
    postData = JSON.parse(obj)
    await axios({
        method: 'post',
        url: 'http://localhost:3000/search',
        data: postData,
      }).then(function (response) {
        console.log("Search response :", response.data)
      });

}

async function select(data){


 // var obj = '{"search":"Mobile"}'
  postData = JSON.parse(data)
  await axios({
      method: 'post',
      url: 'http://localhost:3000/select',
      data: postData,
    }).then(function (response) {
      console.log("Select response :",response.data)
    });

}

async function init(data){

 // var obj = '{"search":"Mobile"}'
  postData = JSON.parse(data)
  await axios({
      method: 'post',
      url: 'http://localhost:3000/init',
      data: postData,
    }).then(function (response) {
      console.log("Init response :",response.data)
    });

}

async function confirm(data){


 // var obj = '{"search":"Mobile"}'
  postData = JSON.parse(data)
  await axios({
      method: 'post',
      url: 'http://localhost:3000/confirm',
      data: postData,
    }).then(function (response) {
      console.log("Confirm response :",response.data)
    });

  await axios.get("http://localhost:3000/aggregation")
  .then(res => console.log(res.data))

}

search();