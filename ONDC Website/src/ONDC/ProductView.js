//Import Section
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { Engine, Scene, Skybox} from 'react-babylonjs'
import { Vector3, Color3, ActionManager} from '@babylonjs/core';
import ScaledModelWithProgress from './ScaledModelWithProgress'
import FileUpload from "CEEA/FileUpload";
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import ProductImage from "images/ProductImage.jpg";
import Background from 'images/CEEABG.jpeg';
import BoschBand from 'images/BoschBand.jpeg';
import Header from './Header';
import PopUp from './PopUp.js'
import configData from "./config.json";
import { useIsPresent } from "framer-motion";

//All the styles are defined
const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-teal-600 text-gray-100 hocus:bg-teal-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;
const ThreeColumnContainer = styled.div`
  ${tw`mt-10 flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap lg:justify-center max-w-screen-lg mx-auto`}
`;
const FormContainer = styled.div`
  ${tw`sm:p-12 bg-teal-900 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-white`}
    }
  }
`;

const Heading = tw.h1`font-black text-3xl md:text-5xl leading-snug max-w-3xl`;
const Content = tw.div`max-w-screen-xl mx-auto py-10 lg:py-10`;
const InputContainer = tw.div`relative py-4 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-teal-800 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-teal-700 hocus:-translate-y-px hocus:shadow-xl`;
const HighlightedText = tw.span`bg-teal-600 text-gray-100 px-4 transform -skew-x-12 inline-block`;
const imageCss = tw`rounded-4xl`;

//All the links
var link = "https://ceeacms.azure-api.net/api/products/";
let hotSpotURL;

//Variables for 3D view
let activeProductName;
let activeProductCompany;
let activeProductDecription;
let activeProductSpecification;
let activeProductWarranty;
let activeProductQuantity;
let activeProductPrice;
let activeProductFulfillment;
let activeProductPaymentMode;
let activeProductImageLink;
let activeProductModelLink;
let activeProductID = 91;

//Variables for category
let authorCategoryName = "Décor"
let paymentMode = "UPI"
let fulfillmentCriteria = "Home Delivery"
let authorCategoryID = 1;
let paymentModeID = 1;
let fulfillmentCriteriaID = 1;

//Other variables
let baseUrl;
let gltfFileName;
const token = 'U3VyYWo6I0Jvc2NoMTIz'
let infoSaveErrorOccured = false;
let loginFailedError = false;

function App() 
{
  const [allProducts, setSuggestions] = useState([]);
  
  //Get all the products
  useEffect(() => {
    fetch(link, 
    {
      headers:{
        "Authorization" : `Basic ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
      });
  }, [link]);
  
  //Settings for Carousel
  let settings = 
  {
    infinite: false,
    speed: 1000,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const [categoryData, setCategory] = useState([]);
  axios.get(configData.categoryURL, {
    headers:{
      "Authorization" : `Basic ${token}`
    }
  })
        .then(response => {
          setCategory(response.data);
        })
        .catch(error =>{
                console.log(error)
            }) 

  const [clickedId, setClickedId] = useState(-1);

  const onTabChanged = (event, id, categoryLink) => 
  {
    setClickedId(id);
    link = categoryLink;
  };

  const [showAddProduct, setAddProductState] = useState(true);
  const toggleAddProductState = () => setAddProductState(!showAddProduct);

  const [show3DView, set3DViewState] = useState(false);
  const toggle3DViewState = (event, productName, productCompany, productDescription, 
    productSpecification, productWarranty, imageLink, modelLink, id, quantity, price, paymentMode, fullFillMent) => 
  {
    set3DViewState(!show3DView);
    activeProductName = productName
    activeProductCompany = productCompany
    activeProductDecription = productDescription
    activeProductSpecification = productSpecification
    activeProductWarranty = productWarranty
    activeProductPrice = price
    activeProductQuantity = quantity
    activeProductPaymentMode = paymentMode
    activeProductFulfillment = fullFillMent
    activeProductImageLink = imageLink
    activeProductModelLink = modelLink
    activeProductID = id

    if(activeProductModelLink != null)
    {
      var gltfLinkParts = activeProductModelLink.split('/');
      gltfFileName = gltfLinkParts[gltfLinkParts.length - 1];
      baseUrl = activeProductModelLink.replace(gltfFileName,'');
      hotSpotURL = configData.fullProductURL + activeProductID + "/hotspots"
    }
  }

  const [infoSaved, saveInfo] = useState(true);
  const onSaveInfo = (event) => 
  {
    categoryData.map(item => {
      if(item.categoryName == authorCategoryName)
      {
        authorCategoryID = item.categoryid
      }
    });

    var jsonObject = 
    {
      "categoryid":authorCategoryID,
      "categoryName":authorCategoryName,
      "categoryDescription":"Sample",
      "channel":"Test Record",
      "ProductName":document.getElementById('productName').value,
      "productDescription":document.getElementById('productDescription').value,
      "productManual": document.getElementById('productManualLink').value,
      "productSpecification":document.getElementById('productSpecification').value,
      "productWarranty":document.getElementById('productWarranty').value,
      "productFeatures": "Sample Text",
      "productModel": "",
      "productCompany":document.getElementById('productCompany').value,
      "productPreview": "",
      "productCreated": "2021-08-23T00:00:00",
      "productAuthor": "Bosch",
      "seller": "newseller",
      "fullfilmentCriteria": "",
      "quantity": "",
      "price": "",
      "paymentMode": ""
    }

    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if(document.getElementById('productName').value != '' && document.getElementById('productCompany').value != '' &&
    document.getElementById('productName').value.length < 25 && document.getElementById('productCompany').value.length < 25 &&
    !format.test(document.getElementById('productName').value) && !format.test(document.getElementById('productCompany').value))
    {
      infoSaveErrorOccured = false;
        axios.post(configData.fullProductURL,jsonObject, {
          headers: {
            'Authorization': `Basic ${token}` }
          })
        .then(response => {
          console.log(response.data[0].ProductId)
          sessionStorage.setItem('activeProductID', response.data[0].ProductId);
          saveInfo(!infoSaved);
        })
        .catch(error =>{
              console.log(error)
          })
    }
    else
    {
      infoSaveErrorOccured = true;
    }
  }

  const onModelLoaded = (model) => {
    let mesh = model.meshes[1];
    mesh.actionManager = new ActionManager(mesh._scene);
  }

  const [value,setValue]=useState('');
  const categoryDropDownChange=(e)=>{
    setValue(e)
    authorCategoryName = e
    categoryData.map(item => {
      if(item.categoryName == authorCategoryName)
      {
        authorCategoryID = item.categoryid
      }
    });
    console.log("authorCategoryID " + authorCategoryID);
  }  

  //Payment mode Dropdown
  let paymentData = [
    { label: "UPI", value: 1 },
    { label: "Cash on Delivery", value: 2 },
    { label: "Debit card", value: 3 },
    { label: "Credit card", value: 4 }
  ]

  const [paymentValue,setPaymentValue]=useState('');
  const paymentDropDownChange=(e)=>{
    setPaymentValue(e)
    paymentMode = e
    paymentData.map(item => {
      if(item.label == paymentMode)
      {
        paymentModeID = item.value
      }
    });
    console.log("paymentModeID " + paymentModeID);
  }  

  //Fulfillment Criteria Dropdown
  let fulfillmentCriteriaData = [
    { label: "Home delivery", value: 1 },
    { label: "In store pickup", value: 2 }
  ]
  const [fulfillmentValue,setFulfillmentValue]=useState('');
  const fulfillmentDropDownChange=(e)=>{
    setFulfillmentValue(e)
    fulfillmentCriteria = e
    fulfillmentCriteriaData.map(item => {
      if(item.label == fulfillmentCriteria)
      {
        fulfillmentCriteriaID = item.value
      }
    });
    console.log("fulfillmentCriteriaID " + fulfillmentCriteriaID);
  }  

  const [pickedMesh,setPickedMesh]=useState('');
  const onMeshPicked =(e) => {
    console.log("PickedMesh " + e);
  }

  const [hotSpotData, setHotSpotData] = useState([]);
  if(show3DView)
  {
      axios.get(hotSpotURL, {
      headers: {
        'Authorization': `Basic ${token}` }
      })
        .then(response => {
            setHotSpotData(response.data);
        })
        .catch(error =>{
          console.log(error)
            })
  }

  const [enableLogin, setLoginCondition] = useState(-1);
  const onLoginClicked = (event) => 
  {
    event.preventDefault();

    var loginObject = 
    {
      "UserName":document.getElementById('userName').value,
      "Password":document.getElementById('password').value,
    }
    
    if(document.getElementById('userName').value != '' && document.getElementById('password').value != '')
    {
      axios.post(configData.loginURL,loginObject)
      .then(response => {
          console.log(response)
          setLoginCondition(false);
          sessionStorage.setItem('loginCondition', 1);
          sessionStorage.setItem('userName', document.getElementById('userName').value);
          loginFailedError = false;
      })
      .catch(error =>{
              console.log(error)
              loginFailedError = true;
          })
    }
  };

  const SkyboxScenes = [
    {
        name: 'sunny day',
        texture: `/textures/TropicalSunnyDay`
    }, 
    {
        name: 'specular HDR',
        texture: `/textures/SpecularHDR.dds`
    }
]

const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
    {!sessionStorage.getItem("loginCondition") && (
    <ThreeColumnContainer>
      <FormContainer>
      <div
       style={{
              background: `url(${Background})`,
            }}
    ></div>
    <h2>Sign In</h2>
    {loginFailedError && (<h6 style={{ color: 'red' }}>Incorrect Credentials..!</h6>)}
        <form action="#">
              <InputContainer>
                <Label htmlFor="name-input">User Name *</Label>
                <Input id="userName" type="text" name="name"/>
              </InputContainer>
              <InputContainer>
                <Label htmlFor="name-input">Password *</Label>
                <Input id="password" type="password" name="name"/>
              </InputContainer>
              <div className="form-row">
                  <div className="">
                      <SubmitButton onClick={(event) => onLoginClicked(event)}>Login</SubmitButton>
                  </div>
              </div>
        </form>
    </FormContainer>
    </ThreeColumnContainer>)}
  

    {sessionStorage.getItem("loginCondition") && (
    <Container>
      {!sessionStorage.getItem("acceptDisclaimer") && (<PopUp/>)}
      <img src={BoschBand} alt="BoschBand"/>
      <Header></Header>
      <AnimationRevealPage>
      <Hero
        heading={<>An <HighlightedText>unparalleled </HighlightedText> product experience.</>}
        description= "Experience the product from the comfort of your homes. Real dimensions. Original look and feel."
        imageSrc={ProductImage}
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Get Started"
      />
      <ThreeColumnContainer>
        <Heading>Products</Heading>
      </ThreeColumnContainer>
      <ThreeColumnContainer>
         <button
          name = "All Products" 
          onClick={(event) => onTabChanged(event, -1, configData.fullProductURL)}
          className={"customButton"}>
            All Products
        </button>
      </ThreeColumnContainer>

      <ThreeColumnContainer>
      <h5>Categories</h5>
      </ThreeColumnContainer>
      <ThreeColumnContainer>
      
      {(categoryData.length > 0) && categoryData.map((current, i) => (
          <button 
          key={i} name = {current.categoryName} 
          onClick={(event) => onTabChanged(event, i, configData.categoryURL + current.categoryName)}
          className={i === clickedId ? "customButton active" : "customButton"}
          >
            {current.categoryName}
          </button>
      ))}
      </ThreeColumnContainer>

      <ContentWithPaddingXl>
      </ContentWithPaddingXl>


      <div className="container">
      {allProducts.length === 0 ? (
        <div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Slider {...settings}>
          {allProducts.map((current) => (
            <div className="out" key={current.categoryid}>
              <div className="card">
                <img
                  className="carouselImage"
                  src={current.productPreview}
                />
                <div className="card-body">
                  <h5 className="card-title">{current.ProductName}</h5>
                  <small className="card-text text-sm-center text-muted"> {current.productCompany}</small>
                  <br/>
                  <button className="btn btn-sm follow btn-primary"
                  onClick={(event) => toggle3DViewState(event, current.ProductName, current.productCompany,
                  current.productDescription, current.productSpecification, current.productWarranty, current.productPreview, current.productModel, 
                  current.ProductId, current.quantity, current.price, current.paymentMode, current.fullfilmentCriteria)}>Show 3D View
                  </button> 
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>

    {show3DView && (
    <Container>
    <div>
    {
      <Container>
        <div>
        <h5>3D View</h5>
      <div className="row">
      </div>
      <div className="row">
        <div className="col-xs-40 col-md-20">
        
        <Engine antialias adaptToDeviceRatio canvasId='babylonJS' >
            <Scene>
              <arcRotateCamera name="camera2" alpha={Math.PI / 2} beta={Math.PI / 2} radius={3} target={new Vector3(0, 0, 0)} 
              lowerRadiusLimit = {1.5} wheelPrecision={50} upperRadiusLimit = {5} />
              <hemisphericLight name="light2" intensity={4} direction={Vector3.Up()} />

              <hemisphericLight name="light2" intensity={4} direction={Vector3.Down()} />

              {/* <Skybox rootUrl={SkyboxScenes[1].texture} /> */}

              <ScaledModelWithProgress rootUrl={baseUrl} sceneFilename={gltfFileName} scaleTo={1}
                progressBarColor={Color3.FromInts(0, 255, 0)} center={new Vector3(0, 0, 0)}
                onModelLoaded={onModelLoaded}
              />

            {(hotSpotData.length > 0) && hotSpotData.map((current) => (
              <box name = "HotspotParent" size={0.001} position={new Vector3(current.transform.split(',')[0], current.transform.split(',')[1],
              current.transform.split(',')[2])} rotation={new Vector3(0,135,0)}>

              <box name  = "Hotspot" scaling={new Vector3(0.005, 0.2, 0.005)} Vect position = {new Vector3(0, 0.1, 0)}>
              </box>

              <plane name="Input" size={1} position={new Vector3(0, 0.25, 0)}>
              <advancedDynamicTexture name="dialogTexture" height={1024} width={1920} createForParentMesh={true} hasAlpha={true}>
                <rectangle name="rect-1" height={0.1} width={0.25} thickness={10} cornerRadius={12}>
                    <rectangle>
                      <babylon-button name="close-icon" background="#008ECF">
                        <textBlock name = "Text" text={current.hotspotText} fontStyle="normal" fontSize={40} color="white" />
                      </babylon-button>
                    </rectangle>
                </rectangle>
              </advancedDynamicTexture>
              </plane>
              </box>
            ))}
            </Scene>
          </Engine>
        </div>
        
        <div className="col-xs-12 col-md-6">
                <pre>
                  </pre>
              </div>
            </div>
          </div>
            <div>
              <div className="card">
                <img
                  className="btn-primary"
                  height={100}
                  width={100}
                  src={activeProductImageLink}
                  alt={ProductImage}
                />
                <div className="card-body">
                  <h2 className="card-title">{activeProductName}</h2>
                  <small className="card-text text-sm-center text-muted">{activeProductCompany}</small>
                  {/* <br></br>
                  <small className="card-text text-sm-center text-muted">{activeProductDecription}</small> */}
                  <br></br>
                  <small className="card-text text-sm-center text-muted">{activeProductSpecification}</small>
                  <br></br>
                  <small className="card-text text-sm-center text-muted">Warranty: {activeProductWarranty}</small>
                  <br/>
                  <small className="card-text text-sm-center text-muted">Price: {activeProductPrice}</small>
                  <br/>
                  <small className="card-text text-sm-center text-muted">Quantity: {activeProductQuantity}</small>
                  <br/>
                  <small className="card-text text-sm-center text-muted">Payment: {activeProductPaymentMode}</small>
                  <br/>
                  <small className="card-text text-sm-center text-muted">Delivery: {activeProductFulfillment}</small>
                  <br/>
                  <button className="btn btn-sm follow btn-primary" 
                  onClick={toggle3DViewState}>{show3DView?"Close 3D View":""}
                  </button> 
                </div>
              </div>
            </div>
        </Container>
        }
          </div>
        </Container>
      )}
      
      <Container>
          <PrimaryAction onClick={toggleAddProductState}>{showAddProduct?"Author new product":"Close"}</PrimaryAction>
          {
              !showAddProduct && (<div>
              {
                (
                <div>
                 <Container>
                  <Content>
                  {infoSaved && (<FormContainer>
                        <h2>Enter Product Details</h2>
                        {infoSaveErrorOccured && (<h6 style={{ color: 'red' }}>Mandatory fields cant be blank</h6>)}
                        {infoSaveErrorOccured && (<h6 style={{ color: 'red' }}>Character limit is 25</h6>)}
                        {infoSaveErrorOccured && (<h6 style={{ color: 'red' }}>Only Alpha numeric characters are allowed</h6>)}
                        <form action="#">
                              <InputContainer>
                                <Label htmlFor="name-input">Product Name *</Label>
                                <Input id="productName" type="text" name="name"/>
                              </InputContainer>
                              <InputContainer>
                                <Label htmlFor="name-input">Product Company *</Label>
                                <Input id="productCompany" type="text" name="name"/>
                              </InputContainer>
                              <InputContainer>
                                <Label htmlFor="name-input">Category Name *</Label>
                                <br/>
                              <DropdownButton
                                alignRight
                                title={authorCategoryName}
                                id="dropdown-menu-align-right"
                                background="bg-teal-200"
                                onSelect={categoryDropDownChange}
                                  >
                                {categoryData.map((current, i) => (
                                <Dropdown.Item eventKey={current.categoryName}>{current.categoryName}</Dropdown.Item>
                                ))}
                              </DropdownButton>
                              </InputContainer>
                              <InputContainer>
                                <Label htmlFor="name-input">Product Description</Label>
                                <Input id="productDescription" type="text" name="name"/>
                              </InputContainer>
                              <InputContainer>
                                <Label htmlFor="name-input">Product Specification</Label>
                                <Input id="productSpecification" type="text" name="name"/>
                              </InputContainer>
                              <InputContainer>
                                <Label htmlFor="name-input">Product Warranty</Label>
                                <Input id="productWarranty" type="text" name="name"/>
                              </InputContainer>
                              <InputContainer>
                                <Label htmlFor="name-input">Price</Label>
                                <Input id="price" type="text" name="name"/>
                              </InputContainer>
                              <InputContainer>
                                <Label htmlFor="name-input">Quantity</Label>
                                <Input id="quantity" type="text" name="name"/>
                              </InputContainer>
                              <InputContainer>
                                <Label htmlFor="name-input">Payment Mode *</Label>
                                <br/>
                              <DropdownButton
                                alignRight
                                title={paymentMode}
                                id="dropdown-menu-align-right"
                                onSelect={paymentDropDownChange}
                                  >
                                {paymentData.map((current, i) => (
                                <Dropdown.Item eventKey={current.label}>{current.label}</Dropdown.Item>
                                ))}
                              </DropdownButton>
                              </InputContainer>

                              <InputContainer>
                                <Label htmlFor="name-input">Fulfillment Criteria *</Label>
                                <br/>
                              <DropdownButton
                                alignRight
                                title={fulfillmentCriteria}
                                id="dropdown-menu-align-right"
                                onSelect={fulfillmentDropDownChange}
                                  >
                                {fulfillmentCriteriaData.map((current, i) => (
                                <Dropdown.Item eventKey={current.label}>{current.label}</Dropdown.Item>
                                ))}
                              </DropdownButton>
                              </InputContainer>

                              <InputContainer>
                                <Label htmlFor="name-input">Product Manual Link</Label>
                                <Input id="productManualLink" type="text" name="name"/>
                              </InputContainer>
                        </form>
                        <div className="form-row">
                          <div className="">
                              <SubmitButton onClick={(event) => onSaveInfo(event)}>Next</SubmitButton>
                          </div>
                      </div>
                    </FormContainer>)}

                    {!infoSaved && (<FormContainer>
                        <h2>Upload Product</h2>
                        <FileUpload/>
                    </FormContainer>)}
                  </Content>
                </Container>
              </div>)
              }
              </div>)
          }
        </Container> 

      {/* <Footer /> */}
    </AnimationRevealPage>
        <Footer />    
</Container>)}
</div>
  );
}

export default App;