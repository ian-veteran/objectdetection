import React, { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Spinner from "../Spinner";

const ObjectDetectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  width: 100%;
  height: 100%;
  flex: 9;
`;

const DetectorContainer = styled.div`
  min-width: 400px;
  height: 400px;
  border: 3px solid #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TargetImg = styled.img`
  height: 100%;
  max-width: 100%;
  display: ${({ isLoading }) => (isLoading ? "none" : "block")};
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
  border-radius: 10px;

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
    content: "${({ classType, score }) =>
      `${classType} ${score.toFixed(2) * 100}%`}";
    color: #000000;
    font-weight: 500;
    font-size: 17px;
    position: absolute;
    top: -1.5em;
    left: -5px;
  }
`;

export function ObjectDetector() {
  const [imgData, setImgData] = useState(null);
  const imgRef = useRef();
  const fileInputRef = useRef();
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [delayEnded, setDelayEnded] = useState(false);

  const isEmptyPrediction = !predictions || predictions.length === 0;

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const normalizePredictions = (predictions, imgSize) => {
    if (!predictions || !imgSize || !imgRef.current) return [];
    return predictions.map((prediction) => {
      const { x, y, width, height } = prediction;

      const imgWidth = imgRef.current.width;
      const imgHeight = imgRef.current.height;

      const normalizedX = (x * imgWidth) / imgSize.width;
      const normalizedY = (y * imgHeight) / imgSize.height;
      const normalizedWidth = (width * imgWidth) / imgSize.width;
      const normalizedHeight = (height * imgHeight) / imgSize.height;

      return {
        ...prediction,
        bbox: [normalizedX, normalizedY, normalizedWidth, normalizedHeight],
      };
    });
  };

  const detectObjectsOnImage = async (imageElement, imgSize) => {
    try {
      console.log("Starting object detection...");
      const file = fileInputRef.current.files[0];
      console.log("Selected file:", file);
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1]; // Get base64 part of the data URL
        console.log("Base64 image data:", base64Image);

        const response = await axios({
          method: "POST",
          url: "https://detect.roboflow.com/lukemia-yrytc/1",
          params: {
            api_key: "YLK6lMqxJmuCDufEJYAR",
          },
          data: base64Image,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        console.log("API response:", response.data);
        const { predictions } = response.data;
        const normalizedPredictions = normalizePredictions(
          predictions,
          imgSize
        );
        console.log("Normalized predictions:", normalizedPredictions);
        setPredictions(normalizedPredictions);
      };

      reader.readAsDataURL(file); // This will trigger the onloadend event
    } catch (error) {
      console.error("Error detecting objects:", error);
    }
  };

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
      setTimeout(() => {
        // Delay for showing the spinner
        setIsLoading(false);
        setDelayEnded(true);
      }, 2000);
    };
  };

  const toggleFullScreen = (element) => {
    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  

  return (
    <ObjectDetectorContainer>
      <SelectButton onClick={openFilePicker}>
        {isLoading && !delayEnded ? "Recognizing..." : "AI Image Analysis"}
      </SelectButton>
      <DetectorContainer>
        {isLoading && !delayEnded && <Spinner />}
        {imgData && delayEnded && (
          <TargetImg
            src={imgData}
            ref={imgRef}
            onDoubleClick={() => toggleFullScreen(imgRef.current)}
          />
        )}
        {!isEmptyPrediction &&
          predictions.map((prediction, idx) => (
            <TargetBox
              key={idx}
              x={prediction.bbox[0]}
              y={prediction.bbox[1]}
              width={prediction.bbox[2]}
              height={prediction.bbox[3]}
              classType={prediction.class}
              score={prediction.confidence}
            />
          ))}
      </DetectorContainer>
      <HiddenFileInput
        type="file"
        ref={fileInputRef}
        onChange={onSelectImage}
      />
    </ObjectDetectorContainer>
  );
}
