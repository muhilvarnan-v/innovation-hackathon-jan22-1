import React, {useState} from 'react';
import { Box, RadioButtonGroup } from 'grommet';

const Exstrinsicinput = (props) => {
  console.log(props);
  const extrinsicInputs = props.extrinsicInputs;
  const handleChange = props.handleChange;
  const [value, setValue] = 
    useState({
      season: "Winters",
      income: "Low",
      age: "Kids",
      gender: "More Men"
    })
  return (
    
  <Box  
    elevation="medium" 
    align="center" 
    pad={{left: "40px",
          top: "10px" }}
    margin={
      {top: "20px"}
    }
    width="100%" 
    textAlign="center" 
    direction="column">
    Season
    <Box gap="small" pad="small" direction="row" >
      <RadioButtonGroup
        name="season"
        direction="row"
        gap="xsmall"
        options={['Winters', 'Regular', 'Summer']}
        value={extrinsicInputs.season}
        onChange={(event) => handleChange(event)}>
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

    Income
    <Box gap="small" pad="small" direction="row">
      <RadioButtonGroup
        name="income"
        direction="row"
        gap="xsmall"
        options={['Low', 'Avg', 'High']}
        value={extrinsicInputs.income}
        onChange={(event) => handleChange(event)}>
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
    Age
    <Box gap="small" pad="small" direction="row">
      <RadioButtonGroup
        name="age"
        direction="row"
        gap="xsmall"
        options={['Kids', 'Adult', 'Elder']}
        value={extrinsicInputs.age}
        onChange={(event) => handleChange(event)}>
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
    <Box 
      elevation="xsmall"
      align="center"
      justify="center">
      Gender
      <Box gap="small" pad="small" direction="row">
        <RadioButtonGroup
          name="gender"
          direction="row"
          gap="xsmall"
          options={['More Men', 'Equal', 'More Women']}
          value={extrinsicInputs.gender}
        onChange={(event) => handleChange(event)}>
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
    </Box>

  </Box>
    
  )
};

export default Exstrinsicinput;