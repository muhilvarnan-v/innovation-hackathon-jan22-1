import React,{useState} from 'react';
import {Box,RadioButtonGroup} from 'grommet';


const Input=(props)=>{
  // console.log(props);
  const [value, setValue] = 
    useState({
      season: "Winters",
      income: "Low",
      age: "Kids",
      gender: "More Men"
    })
return(
<Box  
    elevation="medium" 
    align="center" 
    pad={{top:'10px'}}
    margin={{left: "40px",
          top: "10px" }}
    width="100%"
    height="87vh" 
    textAlign="center" 
    direction="column">

  Time
    <Box gap="small" pad="small" direction="row" >
      <RadioButtonGroup
        name="Time"
        direction="row"
        gap="xsmall"
        options={['Morning', 'Noon', 'Evening']}
        value={value}
        onChange={(event) => {
          setValue((value) =>{
            return {
              ...value,
              season: event.target.value
            }
          }
          )}
        }>
        {(option, { checked, focus, hover }) => {
          let background;
          if (checked) background = 'brand';
          else if (hover) background = 'light-4';
          else if (focus) background = 'light-4';
          else background = 'light-2';
          return (
            <Box 
              background={background} 
              pad="xsmall"
              height="60px"
              width="80px"
              align="center"
              justify="center">
              {option}
            </Box>
          );
        }}
      </RadioButtonGroup>
    </Box>

Demand/season
<Box gap="small" pad="small" direction="row" >
      <RadioButtonGroup
        name="Demand"
        direction="row"
        gap="xsmall"
        options={['Holiday', 'Normal', 'Festival']}
        value={value}
        onChange={(event) => {
          setValue((value) =>{
            return {
              ...value,
              season: event.target.value
            }
          }
          )}
        }>
        {(option, { checked, focus, hover }) => {
          let background;
          if (checked) background = 'brand';
          else if (hover) background = 'light-4';
          else if (focus) background = 'light-4';
          else background = 'light-2';
          return (
            <Box 
              background={background} 
              pad="xsmall"
              height="60px"
              width="80px"
              align="center"
              justify="center">
              {option}
            </Box>
          );
        }}
      </RadioButtonGroup>
    </Box>

Inventory level
<Box gap="small" pad="small" direction="row" >
      <RadioButtonGroup
        name="Inventorylevel"
        direction="row"
        gap="xsmall"
        options={['Low', 'Regular', 'High']}
        value={value}
        onChange={(event) => {
          setValue((value) =>{
            return {
              ...value,
              season: event.target.value
            }
          }
          )}
        }>
        {(option, { checked, focus, hover }) => {
          let background;
          if (checked) background = 'brand';
          else if (hover) background = 'light-4';
          else if (focus) background = 'light-4';
          else background = 'light-2';
          return (
            <Box 
              background={background} 
              pad="xsmall"
              height="60px"
              width="80px"
              align="center"
              justify="center">
              {option}
            </Box>
          );
        }}
      </RadioButtonGroup>
    </Box>

Market Dynamics
<Box gap="small" pad="small" direction="row" >
      <RadioButtonGroup
        name="Marketdynamics"
        direction="row"
        gap="xsmall"
        options={['Low Disc', 'Avg', 'High Disc']}
        value={value}
        onChange={(event) => {
          setValue((value) =>{
            return {
              ...value,
              season: event.target.value
            }
          }
          )}
        }>
        {(option, { checked, focus, hover }) => {
          let background;
          if (checked) background = 'brand';
          else if (hover) background = 'light-4';
          else if (focus) background = 'light-4';
          else background = 'light-2';
          return (
            <Box 
              background={background} 
              pad="xsmall"
              height="60px"
              width="80px"
              align="center"
              justify="center">
              {option}
            </Box>
          );
        }}
      </RadioButtonGroup>
    </Box>

Weather
<Box gap="small" pad="small" direction="row" >
      <RadioButtonGroup
        name="Weather"
        direction="row"
        gap="xsmall"
        options={['Winter', 'Summer', 'Rainy']}
        value={value}
        onChange={(event) => {
          setValue((value) =>{
            return {
              ...value,
              season: event.target.value
            }
          }
          )}
        }>
        {(option, { checked, focus, hover }) => {
          let background;
          if (checked) background = 'brand';
          else if (hover) background = 'light-4';
          else if (focus) background = 'light-4';
          else background = 'light-2';
          return (
            <Box 
              background={background} 
              pad="xsmall"
              height="60px"
              width="80px"
              align="center"
              justify="center">
              {option}
            </Box>
          );
        }}
      </RadioButtonGroup>
    </Box>

</Box>//end of outer box

)
};

export default Input;