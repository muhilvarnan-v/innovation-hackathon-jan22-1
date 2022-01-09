import React,{useState} from 'react';
import { Box,Grommet, Heading } from 'grommet';
import Input from './components/Input';
import Output from './components/Output';


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
    const [input, setInput] =
    useState (
      {
        time: "Morning",
        demand: "Holiday",
        inventorylevel: "Low",
        marketdynamics: "low disc",
        weather:"winter"
      }
    )

  const [output,setOutput] =
  useState( {
    expectedRevenue: 100000,
    pastMonthRevenue: 90000,
    expectedProfit: 20000,
    pastMonthProfit: 10000
  }
);
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
          Tezi Dynamic pricing
        </Heading>
        <hr style={{width:'95vw'}}/>
      </Box>
  </Box>

 {/*main body box*/}

    <Box 
          id="BodyBox"
          direction="row"
          align="center"
          justify="between"
          fill
          width="100vw"
          height="89vh"
          margin="0px">
          
      {/*left body box*/}
          
      <Box 
          id="BodyLeftPane"
          width="50%"
          height="86vh" 
          align="left"
          justify="center"
          margin="10px 10px 15px 10px"
          direction="column">
          <Input input={input}/>
      </Box>
      
      {/*Right body box*/}

      
      <Box 
        id="RightPane"
        margin={{right:"10px"}}
        width="50%"
        height="90vh"
        align="right"
        justify="center"
        direction="column">
        <Output output={output}/>
      </Box>

    </Box>

    </Grommet>
  );
}

export default App;