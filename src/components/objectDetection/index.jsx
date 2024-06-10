import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
/*
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
*/
const ObjectDetectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 3px solid #00ff00;
  width: 500px;
  height: 500px;
  margin-left: 400px;
  
`;

const DetectorContainer = styled.div`
  min-width: 200px;
  height: 700px;
  border: 3px solid #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: green;
`;

const TargetImg = styled.img`
  height: 100%;
  max-width: 100%;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SelectButton = styled.div`
  padding: 7px 10px;
  border: 2px solid transparent;
  background-color: #0a0f22;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  margin-top: 2em;
  cursor: pointer;
  transition: all 260ms ease-in-out;

  &:hover {
    background-color: transparent;
    border: 2px solid #1c2127;
    color: #1c2127;
  }
`;

const TargetBox = styled.div`
  position: absolute;

  left: ${({ x }) => x + "px"};
  top: ${({ y }) => y + "px"};
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};

  border: 4px solid #1ac71a;
  background-color: transparent;
  z-index: 20;

  &::before {
    content: "${({ classType, score }) => `${classType} ${score.toFixed(2)}`}";
    color: #1ac71a;
    font-weight: 500;
    font-size: 17px;
    position: absolute;
    top: -1.5em;
    left: -5px;
  }
`;

export function ObjectDetector(props) {
  const [imgData, setImgData] = useState(null);
  const [model, setModel] = useState();
  const imgRef = useRef();
  const fileInputRef = useRef();
  const [predictions, setPredictions] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const isEmptyPrediction = !predictions || predictions.length === 0;

  /*useEffect(
    function () {
      async function tenModel() {
        try {
          const res = await tf.loadLayersModel("/model.json");
          console.log("Response was a success");

          if (!res.ok)
            throw new Error("Something went wrong with fetching the model.");

          const data = await res.json();
          setModel(data.Search);
        } catch (err) {
          console.error(err.message);
        }
      }

      tenModel();
    },
    [setModel]
  );*/

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const normalizePredictions = (predictions, imgSize) => {
    if (!predictions || !imgSize || !imgRef) return [];
    return predictions.map((prediction) => {
      const { bbox } = prediction;
      const oldX = bbox[0];
      const oldY = bbox[1];
      const oldWidth = bbox[2];
      const oldHeight = bbox[3];

      const imgWidth = imgRef.current.width;
      const imgHeight = imgRef.current.height;

      const x = (oldX * imgWidth) / imgSize.width;
      const y = (oldY * imgHeight) / imgSize.height;
      const width = (oldWidth * imgWidth) / imgSize.width;
      const height = (oldHeight * imgHeight) / imgSize.height;

      return { ...prediction, bbox: [x, y, width, height] };
    });
  };

  const detectObjectsOnImage = async (imageElement, imgSize) => {
    /*const model = await cocoSsd.load({});*/
    const predictions = await model.detect(imageElement, 6);
    const normalizedPredictions = normalizePredictions(predictions, imgSize);
    setPredictions(normalizedPredictions);
    console.log("predictions:", predictions);
  };

  /*const detectObjectsOnImage = async (imageElement, imgSize) => {
    const predictions = await model.detect(imageElement, 6);
    const normalizedPredictions = normalizePredictions(predictions, imgSize);
    setPredictions(normalizedPredictions);
    console.log("predictions:", predictions);
  };*/

  const readImage = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  const onSelectImage = async (e) => {
    setPredictions([]);
    setIsLoading(true);

    const file = e.target.files[0];
    const imgData = await readImage(file);
    setImgData(imgData);

    const imageElement = document.createElement("img");
    imageElement.src = imgData;

    imageElement.onload = async () => {
      const imgSize = {
        width: imageElement.width,
        height: imageElement.height,
      };
      await detectObjectsOnImage(imageElement, imgSize);
      setIsLoading(false);
    };
  };

  return (
    <ObjectDetectorContainer>
      <DetectorContainer>
        {imgData && <TargetImg src={imgData} ref={imgRef} />}
        {!isEmptyPrediction &&
          predictions.map((prediction, idx) => (
            <TargetBox
              key={idx}
              x={prediction.bbox[0]}
              y={prediction.bbox[1]}
              width={prediction.bbox[2]}
              height={prediction.bbox[3]}
              classType={prediction.class}
              score={prediction.score}
            />
          ))}
      </DetectorContainer>
      <HiddenFileInput
        type="file"
        ref={fileInputRef}
        onChange={onSelectImage}
      />
      <SelectButton onClick={openFilePicker}>
        {isloading ? "Recognizing..." : "Select Image"}
      </SelectButton>
    </ObjectDetectorContainer>
  );
}
