import React from 'react'
import axios from 'axios';
import tw from "twin.macro";
import { Engine, Scene, Skybox } from 'react-babylonjs'
import { Vector3, Color3, ActionManager} from '@babylonjs/core';
import ScaledModelWithProgress from './ScaledModelWithProgress'
import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents";
import configData from "./config.json";

const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-blue-800 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-blue-700 hocus:-translate-y-px hocus:shadow-xl`;
let productID;

let baseUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF/";
let gltfFileName = "BoomBox.gltf";
let hotSpotID = 0;
let activeInputID = 0;

const token = 'U3VyYWo6I0Jvc2NoMTIz'

class FileUpload extends React.Component
{
    constructor(){
        super();
        this.state = {
            selectedFile:'',
            modelUploaded: false,
            imageUploaded:false,
            hotspotUploaded:false,
            productPublished:false,
            hotspotObject:[]
        }

        this.meshPicked = this.meshPicked.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
    }

    submitModel(){
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        console.log(this.state.selectedFile);
        let url = configData.assetUploadURL + productID;
        console.log(url);

        // if(data.size < 25000000)
        {
            axios.post(url, data, {
                headers:{
                  "Authorization" : `Basic ${token}`
                }
              })
            .then(res => { // then print response status
                console.log(res);
                this.setState({
                    modelUploaded: true,
                  })
            })
        }
    }

    submitImage(){
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        console.log(this.state.selectedFile);
        let url = configData.assetUploadURL + productID;
        console.log(url);
        axios.post(url, data, {
            headers:{
              "Authorization" : `Basic ${token}`
            }
          })
        .then(res => { // then print response status
            console.log(res)
            this.setState({
                imageUploaded: true,
              })
        })
    }

    uploadHotspots(){
        let url = configData.productURL + productID + "/hotspots";

        this.setState({
            hotspotUploaded: true,
          })

        let hotSpotPostData = JSON.stringify(this.state.hotspotObject).slice(1,-1);
        console.log(hotSpotPostData);

        fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization" : `Basic ${token}`
        },
        body: hotSpotPostData
        }).then(function(response) {
            console.log(response)
        })
        .catch(function(error) {
        console.error(error);
        });
    }

    publishProduct()
    {
        var jsonObject = 
        {
            "publishingStatus":"Publish",
            "publisherSource":"CEEA",
            "SubmittedBy":"Admin",
        }

    axios.post(configData.productURL + productID + '/publish', jsonObject, {
        headers:{
          "Authorization" : `Basic ${token}`
        }
      })
    .then(response => {
        console.log(response.data[0].ProductId)
        window.location.reload();
        this.setState({
            productPublished: true,
          })
    })
    .catch(error =>{
            console.log(error)
        })
  }

    meshPicked (pointX, pointY, pointZ, hotSpotText) 
    {
        var pickedPoint = "" + pointX.toFixed(2) + "," + pointY.toFixed(2) + "," + pointZ.toFixed(2);
        hotSpotID++;
        var hotSpotJson = 
        {
            "hotspotid": hotSpotID,
            "transform": pickedPoint,
            "scale": "0.2,0.2,0.2",
            "rotation": "135",
            "hotspotText": hotSpotText,
            "hotspotimage": "",
            "hotspotMedia": "",
            "createdBy": ""
        }

        this.state.hotspotObject.push(hotSpotJson)
        {
            
        }
    }

    TextChanged(text)
    {
        console.log("Text changed " + text);
        console.log("Active Input ID " + activeInputID);
        this.state.hotspotObject[activeInputID - 1].hotspotText = text;
        this.forceUpdate();
        console.log(this.state.hotspotObject);
    }
    
    render(){
        axios.get(configData.productURL, {
            headers:{
              "Authorization" : `Basic ${token}`
            }
          })
        .then(response => {
            productID = sessionStorage.getItem('activeProductID');
            console.log("productID " + productID);
            response.data.map(item => {
                if(item.ProductId == productID)
                {
                    var gltfLinkParts = item.productModel.split('/');
                    gltfFileName = gltfLinkParts[gltfLinkParts.length - 1];
                    baseUrl = item.productModel.replace(gltfFileName,'');
                }
            });
            console.log(baseUrl + gltfFileName);
        })
        .catch(error =>{
                console.log(error)
            })

        const onModelLoaded = (model) => {
            let mesh = model.meshes[1];
            mesh.actionManager = new ActionManager(mesh._scene);
            console.log(baseUrl + gltfFileName);
            }

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

        return(
            <div>
            {!this.state.modelUploaded && (<div>
                <div className="col-md-6">
                    <br />
                    <div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="text-white">Select GLTF file :</label>
                            <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="">
                            <SubmitButton type="submit" className="btn btn-dark" onClick={()=>this.submitModel()}>Upload</SubmitButton>
                        </div>
                    </div>
                </div>
            </div>)}

            {this.state.modelUploaded && !this.state.imageUploaded && (<div>
            <div className="col-md-6">
                <br />
                    <div className="form-row">
                        <div className="form-group">
                            <label className="text-white">Select Image file :</label>
                            <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                        </div>
                    </div>
                    
                    <div className="form-row">
                        <div className="">
                            <SubmitButton type="submit" className="btn btn-dark" onClick={()=>this.submitImage()}>Upload</SubmitButton>
                        </div>
                    </div>
                </div>
                </div>)}

            {this.state.imageUploaded && !this.state.productPublished && (<div>
            <div>
                <br/>
                    <div className="form-row">
                        <div className="form-group">
                            <h5 style={{ color: 'white' }}>Files uploaded successfully...!</h5>
                            <h6 style={{ color: 'lightblue' }}>Left Click and Drag: Rotate around the object.</h6>
                            <h6 style={{ color: 'lightblue' }}>Mouse scroll: Zoom in and Out.</h6>
                            <h6 style={{ color: 'lightblue' }}>Right click and Drag: Pan the product.</h6>
                            <h6 style={{ color: 'lightblue' }}>Left click on Product: Add Hotspot.</h6>
                            <h6 style={{ color: 'lightblue' }}>Right click on Hotspot: Delete Hotspot.</h6>
                            <h6 style={{ color: 'lightblue' }}>Left click on Hotspot text: Edit Text.</h6>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-40 col-md-20">
                        <Engine adaptToDeviceRatio={true} antialias={true} canvasId='babylonJSAuthoring'>
                            <Scene onPointerObservable={(evt) => {
                                if (evt.type === PointerEventTypes.POINTERDOWN && evt.pickInfo?.pickedMesh) 
                                {
                                    if(!evt.pickInfo?.pickedMesh.name.includes("Hotspot") && !evt.pickInfo?.pickedMesh.name.includes("Input") &&
                                    !evt.pickInfo?.pickedMesh.name.includes("skybox"))
                                    {
                                        const { pickedPoint } = evt.pickInfo;
                                        this.meshPicked(pickedPoint.x, pickedPoint.y, pickedPoint.z, "Hotspot");
                                    }

                                    if(evt.event.button == 2 && (evt.pickInfo?.pickedMesh.name.includes("Hotspot") || evt.pickInfo?.pickedMesh.name.includes("Input")))
                                    {
                                        const hotSpotIndex = evt.pickInfo?.pickedMesh.name.split('-').pop();

                                        this.setState({
                                            hotspotObject: this.state.hotspotObject.filter(item => item.hotspotid != hotSpotIndex)
                                          })
                                        hotSpotID--;
                                    }

                                    if(evt.pickInfo?.pickedMesh.name.includes("Input"))
                                    {
                                        activeInputID = evt.pickInfo?.pickedMesh.name.split('-').pop();
                                    }
                                    
                                    console.log(evt.event.button);
                                }
                            }}>

                            <arcRotateCamera name="camera1" alpha={Math.PI / 2} beta={Math.PI / 2} radius={3} target={new Vector3(0, 0, 0)} 
                            lowerRadiusLimit = {1.5} wheelPrecision={50} upperRadiusLimit = {5}/>

                            <hemisphericLight name="light1" intensity={4} direction={Vector3.Up()} />
                            <hemisphericLight name="light2" intensity={4} direction={Vector3.Down()} />

                            {/* <Skybox rootUrl={SkyboxScenes[0].texture} /> */}

                            <ScaledModelWithProgress  rootUrl={baseUrl} sceneFilename={gltfFileName} scaleTo={1}
                                progressBarColor={Color3.FromInts(0, 255, 0)} center={new Vector3(0, 0, 0)}
                                onModelLoaded={onModelLoaded}/>

                            {this.state.hotspotObject.map((current) => (
                            <box name = "HotspotParent" size={0.001} position={new Vector3(current.transform.split(',')[0], current.transform.split(',')[1],
                            current.transform.split(',')[2])} rotation={new Vector3(0,135,0)}>
                            
                            <box name  = {"Hotspot-" + current.hotspotid} scaling={new Vector3(0.005, 0.2, 0.005)} Vect position = {new Vector3(0, 0.1, 0)}>
                                </box>
                                <plane name={"Input-" + current.hotspotid} size={1} position={new Vector3(0, 0.25, 0)}>
                                <advancedDynamicTexture name="dialogTexture" height={1024} width={1920} createForParentMesh={true} hasAlpha={true}>
                                    <rectangle height={0.1} width={0.25} thickness={10} cornerRadius={12}>
                                        <rectangle>
                                        <inputText
                                            text=""
                                            color="white"
                                            fontSize={40}
                                            width={1.0}
                                            background="#008ECF"
                                            
                                            onTextChangedObservable={(event) =>
                                                this.TextChanged(event.text)
                                            }
                                        />
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
                        {!this.state.hotspotUploaded && (<div className="form-row">
                            <div className="">
                                <SubmitButton type="submit" className="btn btn-dark" onClick={()=>this.uploadHotspots()}>Save</SubmitButton>
                            </div>
                        </div>)}

                        <div className="form-row">
                            <div className="">
                                <SubmitButton type="submit" className="btn btn-dark" onClick={()=>this.publishProduct()}>Publish</SubmitButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}

            {this.state.productPublished && (<div className="form-row">
                    <div className="form-row">
                        <div className="form-group">
                            <label className="text-white">Product uploaded successfully...!</label>
                        </div>
                    </div>
            </div>)}
        </div>    
        )  
    }
}

export default FileUpload;