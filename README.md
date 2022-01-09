Tezi.app for the Dynamic Pricing and Inventory Manangement challenges.

# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
 70  FrontEnd/README.md 
@@ -0,0 +1,70 @@
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
 11,543  FrontEnd/package-lock.json 
Large diffs are not rendered by default.

 41  FrontEnd/package.json 
@@ -0,0 +1,41 @@
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "grommet": "^2.20.0",
    "grommet-icons": "^4.7.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "5.0.0",
    "styled-components": "^5.3.3",
    "web-vitals": "^2.1.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
 BIN +3.78 KB FrontEnd/public/favicon.ico 
Binary file not shown.
 43  FrontEnd/public/index.html 
@@ -0,0 +1,43 @@
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.
      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.
      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.
      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
 BIN +5.22 KB FrontEnd/public/logo192.png 
Sorry, something went wrong. Reload?
 BIN +9.44 KB FrontEnd/public/logo512.png 

 25  FrontEnd/public/manifest.json 
@@ -0,0 +1,25 @@
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
 3  FrontEnd/public/robots.txt 
@@ -0,0 +1,3 @@
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
 5  FrontEnd/src/App.css 
@@ -0,0 +1,5 @@
main {
  text-align: center;
  vertical-align: center;
  line-height: 100vh
} 
 106  FrontEnd/src/App.jsx 
@@ -0,0 +1,106 @@
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
 8  FrontEnd/src/App.test.js 
@@ -0,0 +1,8 @@
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
 221  FrontEnd/src/components/Input.jsx 
@@ -0,0 +1,221 @@
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
 81  FrontEnd/src/components/Output.jsx 
@@ -0,0 +1,81 @@
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
 13  FrontEnd/src/index.css 
@@ -0,0 +1,13 @@
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
 17  FrontEnd/src/index.js 
@@ -0,0 +1,17 @@
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 1  FrontEnd/src/logo.svg 
@@ -0,0 +1 @@

 13  FrontEnd/src/reportWebVitals.js 
@@ -0,0 +1,13 @@
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
 5  FrontEnd/src/setupTests.js 
@@ -0,0 +1,5 @@
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
