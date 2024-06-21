import * as tflite from '@tensorflow/tfjs-tflite';

const useTFLiteModel = async (modelPath) => {
  const model = await tflite.loadTFLiteModel(modelPath);
  return model;
};

export default useTFLiteModel;
