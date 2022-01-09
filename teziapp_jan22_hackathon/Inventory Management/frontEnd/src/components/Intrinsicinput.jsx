import React from 'react';
import {Box,FormField,TextInput } from 'grommet';

const Intrinsicinput=(props)=>{
  console.log(props);
  const intrinsicInputs = props.intrinsicInputs;
  const handleChange = props.handleChange;

  return(
      <Box
        elevation="medium"  
        align="center"  
        width="100%"
        margin={
          {bottom: "20px"}
        }
        pad={
          { left:"40px",
            top:"10px", 
            bottom:"10px"
          }
        } >

        <FormField 
            name="capitalInput"
            label="Capital (Rs.):" 
            direction="row">
           <TextInput
            name="capitalInput" 
            placeholder="type here" 
            value={intrinsicInputs.capital}
            onChange={event => handleChange(event)}
            type="number" 
            size="16px"  
            margin="small" 
            margin={{left:"20px"}}/>
        </FormField>

        <FormField 
            name="spaceInput"
            label="Space (cubic meter):" 
            direction="row">
            <TextInput  
            name="spaceInput"
            placeholder="type here"
            value={intrinsicInputs.space}
            onChange={event => handleChange(event)} 
            type="number"  
            size="16px" 
            margin="small" 
            margin={{left:"20px"}}/>
        </FormField>
        
        <FormField 
            name="orderCapacityInput"
            label="Ordercapacity (per hour):" 
            direction="row">
            <TextInput 
            name="orderCapacityInput"
            placeholder="type here" 
            value={intrinsicInputs.space}
            onChange={event => handleChange(event)}
            type="number"  
            size="16px" 
            margin="small" 
            margin={{left:"20px"}}/>
        </FormField>
      </Box>
  )
};

export default Intrinsicinput;