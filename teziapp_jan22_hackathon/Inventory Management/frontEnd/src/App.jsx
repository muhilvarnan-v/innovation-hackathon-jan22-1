import React, { useState, useEffect } from 'react';
import {Box,Heading, Layer, Grommet } from 'grommet';
import Intrinsicinput from './components/Intrinsicinput'
import Exstrinsicinput from './components/Exstrinsicinput'
import Expectedoutput from './components/Expectedoutput'


//theme for grommet
const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

function App() {
  const [intrinsicState, setIntrinsicState] = 
    useState (
      {
        capitalInput: 100000,
        spaceInput: 1000,
        orderCapacityInput: 10
      }
    );

  const [extrinsicState, setExtrinsicState] =
    useState (
      {
        season: "Winters",
        income: "Low",
        age: "Kids",
        gender: "More Men"
      }
    );

  const [outputState, setOutputState] = 
    useState(
      {
        expectedRevenue: 100000,
        pastMonthRevenue: 90000,
        expectedProfit: 20000,
        pastMonthProfit: 10000
      }
    );

  useEffect(() => {
    //fetchapi to be used here

    //use setOutputState
  }, [intrinsicState, extrinsicState])

  
  const handleChange = (event) => {
    console.log(event);

    if(
      event.target.name === "capitalInput" ||
      event.target.name === "spaceInput" ||
      event.target.name === "orderCapacityInput"){
        setIntrinsicState((intrinsicState) => (
          {
            ...intrinsicState,
            [event.target.name]:event.target.value
          }
        ))
    } else if(
      event.target.name === "season" ||
      event.target.name === "income" ||
      event.target.name === "age" ||
      event.target.name === "gender" ){
        setExtrinsicState(extrinsicState => (
          {
            ...extrinsicState,
            [event.target.name]:event.target.value
          }
        ))
    }
  }
  

  console.log({intrinsicState, extrinsicState});

  return (
    <Grommet theme={theme}>

      {/*title box*/}
      
  <Box
        fill
        align="center">
        <Box 
          id="TitleBox"
          width="100vw"
          align="Center">
        <Heading 
          margin="xxsmall" 
          size="small" 
          style={{textAlign:'center'}} >
          Tezi inventory management
        </Heading>
        <hr style={{width:"100%"}}/>
      </Box>
      
      {/*main body box*/}

    <Box 
          id="BodyBox"
          direction="row"
          align="center"
          justify="between"
          fill
          width="95vw"
          height="100%"
          padding="4px"
          margin="0px">
          
      {/*left body box*/}
      <Box 
          id="BodyLeftPane"
          width="50%"
          height="90vh"
          align="left"
          justify="center"
          margin="40px 20px 40px 40px"
          direction="column">
            <Intrinsicinput 
              intrinsicInputs={intrinsicState} 
              handleChange={handleChange}/>
            <Exstrinsicinput 
              extrinsicInputs = {extrinsicState}
              handleChange={handleChange}/>
      </Box>
      
      {/*Right body box*/}
      <Box 
        id="RightPane"
        margin={{right:"40px"}}
        width="50%"
        height="100%"
        align="right"
        justify="center">
        <Expectedoutput outputValues = {outputState}/>
      </Box>

    </Box>

  </Box>

    </Grommet>
  );
}

export default App;