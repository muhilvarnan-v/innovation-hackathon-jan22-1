import React,{useState} from 'react';
import {Box, Button, Layer, Text,DataTable } from 'grommet';
import { LinkUp,Close,Download } from 'grommet-icons';


//api url 
const url="/src/temp_prediction.json"

const Expectedoutput=(props)=>{
  // console.log({props});
  const outputValues = props.outputValues;
  const [show, setShow] = useState();
  return(
    <Box 
      direction="column"
      align="center" 
      justify="center">
      <Box
        elevation="medium"
        align="center"
        justify="center"
        height = "60vh"
        width="60vh">
        <Box 
          align="center"
          justify="center">
          
          <Text size="xlarge">
            Expected Revenue: Rs. {outputValues.expectedRevenue/1000}k
            &nbsp;
            <Text
              color="Green"
              size="xlarge">
                {Math.round((outputValues.expectedRevenue/outputValues.pastMonthRevenue-1)*100)}%
                <LinkUp color="Green"/>
            </Text>
          </Text>
            
          
          Previous Month: Rs. {outputValues.pastMonthRevenue/1000}k
        </Box>
        <br/>
        <Box 
          align="center"
          justify="center"
          margin={{top:"20px"}}>
          <Text size="xlarge">
            Expected Profit: Rs. {outputValues.expectedProfit/1000}k
            &nbsp;
            <Text
              color="Green"
              size="xlarge">
                {Math.round((outputValues.expectedProfit/outputValues.pastMonthProfit -1)*100)}%
                <LinkUp color="Green"/>
            </Text>
          </Text>
          Previous Profit: Rs. {outputValues.pastMonthProfit/1000}k
        </Box>
      </Box>
      
   

    </Box>
  )
};

export default Expectedoutput;