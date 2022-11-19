import { ChartJSNodeCanvas, ChartJSNodeCanvasOptions } from 'chartjs-node-canvas';

let instance: ChartJSNodeCanvas;

export const createChartInstance = (
  options: ChartJSNodeCanvasOptions = {
    width: 400,
    height: 400,
    backgroundColour: 'white',
  }
) => {
  if (!instance) instance = new ChartJSNodeCanvas(options);

  return instance;
};
