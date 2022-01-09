import React from 'react';
import {Box, Button, Text } from 'grommet';
import { LinkUp } from 'grommet-icons';

const Output=(props)=>{
  console.log(props);
  const expectedProfit=props.output.expectedProfit;
  const expectedRevenue=props.output.expectedRevenue;
  const pastMonthProfit=props.output.pastMonthProfit;
  const pastMonthRevenue=props.output.pastMonthRevenue;

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
        width="76vh">
        <Box 
          align="center"
          justify="center">
          
          <Text size="xlarge">
            Expected Revenue: Rs. {expectedRevenue}
            &nbsp;
            <Text
              color="Green"
              size="xlarge">
                {(expectedRevenue-pastMonthRevenue)/100}%
                <LinkUp color="Green"/>
            </Text>
          </Text>
            
          
          Previous Revenue: Rs. {pastMonthRevenue}
        </Box>
        <br/>
        <Box 
          align="center"
          justify="center"
          margin={{top:"20px"}}>
          <Text size="xlarge">
            Expected Profit: Rs. 100k
            &nbsp;
            <Text
              color="Green"
              size="xlarge">
                +20%
                <LinkUp color="Green"/>
            </Text>
          </Text>
          Previous Profit: Rs. 90k
        </Box>
      </Box>
      
      <Button 
        primary 
        label="Preview Purchase Order" 
        size="medium"            
        margin={
          { top:"20px",
            left:"50px"
          }
        }
        pad={
          { left:"40px",
            top:"20px",
            bottom:"10px"
          }
        }
      />

    </Box>
  )
};

export default Output;