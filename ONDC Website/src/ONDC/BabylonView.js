import React from "react";
import { Engine, Scene } from "react-babylonjs";
import { Vector3} from "@babylonjs/core";
import "./App.css";
import { Control } from "@babylonjs/gui/2D/controls/control";
import { InputText } from "@babylonjs/gui/2D/controls/inputText";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Engine
        antialias={true}
        adaptToDeviceRatio={true}
        canvasId="sample-canvas"
      >
        <Scene>
          <arcRotateCamera
            name="arc"
            target={new Vector3(0, 1, 0)}
            alpha={-Math.PI / 2}
            beta={0.5 + Math.PI / 4}
            radius={4}
            minZ={0.001}
            wheelPrecision={50}
            lowerRadiusLimit={8}
            upperRadiusLimit={20}
            upperBetaLimit={Math.PI / 2}
          />
          <hemisphericLight
            name="hemi"
            direction={new Vector3(0, -1, 0)}
            intensity={0.8}
          />
          <directionalLight
            name="shadow-light"
            setDirectionToTarget={[Vector3.Zero()]}
            direction={Vector3.Zero()}
            position={new Vector3(-40, 30, -40)}
            intensity={0.4}
            shadowMinZ={1}
            shadowMaxZ={2500}
          >
            <shadowGenerator
              mapSize={1024}
              useBlurExponentialShadowMap={true}
              blurKernel={32}
              shadowCasters={["sphere1", "dialog"]}
              forceBackFacesOnly={true}
              depthScale={100}
            />
          </directionalLight>
          <sphere
            name="sphere1"
            diameter={2}
            segments={16}
            position={new Vector3(0, 1.0, 0)}
          >
            <plane name="dialog" size={2} position={new Vector3(0, 1.5, 0)}>
              <advancedDynamicTexture
                name="dialogTexture"
                height={1024}
                width={1024}
                createForParentMesh={true}
                hasAlpha={true}
              >
                <rectangle
                  name="rect-outer"
                  height={0.5}
                  width={1}
                  thickness={12}
                  cornerRadius={12}
                >
                  <stackPanel name="sp-1" height={1.0}>
                    <rectangle
                      name="rect-inner1"
                      height="200px"
                      verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                      horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
                    >
                      <textBlock
                        text={"Enter Text"}
                        fontStyle="bold"
                        fontSize={200}
                        color="white"
                      />
                    </rectangle>
                    <rectangle
                      name="rect-inner2"
                      height="200px"
                      verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                      horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
                    >
                      <inputText
                        text="circle"
                        color="white"
                        fontSize={150}
                        width={1.0}
                        onTextChangedObservable={(ctl: InputText) =>
                          console.log("new text:", ctl.text)
                        }
                      />
                    </rectangle>
                  </stackPanel>
                </rectangle>
              </advancedDynamicTexture>
            </plane>
          </sphere>

          <ground
            name="ground1"
            width={10}
            height={10}
            subdivisions={2}
            receiveShadows={true}
          />
        </Scene>
      </Engine>
    </div>
  );
}
