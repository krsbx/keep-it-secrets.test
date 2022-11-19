import type { BubbleDataPoint, ChartConfiguration, ScatterDataPoint } from 'chart.js';
import fs from 'fs-extra';
import path from 'path';
import { rootPath } from 'utils/constant';
import { createChartInstance } from './instance';

const createConfig = <Data extends (number | ScatterDataPoint | BubbleDataPoint | null)[]>(
  labels: unknown[],
  data: Data,
  label: string,
  borderColor: string
): ChartConfiguration => ({
  data: {
    labels,
    datasets: [
      {
        data,
        label,
        borderColor,
        radius: 0,
      },
    ],
  },
  type: 'line',
});

export const generateChart = async (channels: KIS.TypeRGBA, _filePath = 'chart.png') => {
  const instance = createChartInstance({
    height: 1080,
    width: 1080,
    backgroundColour: 'white',
  });
  const totalBit = channels.alpha.length;

  const red: number[] = [];
  const green: number[] = [];
  const blue: number[] = [];
  const alpha: number[] = [];
  const labels: number[] = [];

  for (let i = 0; i < totalBit; i += 100) {
    red.push(channels.red.at(i)!);
    green.push(channels.green.at(i)!);
    blue.push(channels.blue.at(i)!);
    alpha.push(channels.alpha.at(i)!);
    labels.push(i);
  }

  const config: ChartConfiguration = {
    data: {
      labels: labels,
      datasets: [
        {
          data: red,
          label: 'Red',
          borderColor: 'red',
          radius: 0,
        },
        {
          data: green,
          label: 'Green',
          borderColor: 'green',
          radius: 0,
        },
        {
          data: blue,
          label: 'Blue',
          borderColor: 'blue',
          radius: 0,
        },
        {
          data: alpha,
          label: 'Alpha',
          borderColor: 'black',
          radius: 0,
        },
      ],
    },
    type: 'line',
  };

  const configRed = createConfig(labels, red, 'Red', 'red');
  const configGreen = createConfig(labels, green, 'Green', 'green');
  const configBlue = createConfig(labels, blue, 'Blue', 'blue');
  const configAlpha = createConfig(labels, alpha, 'Alpha', 'Alpha');

  await Promise.all(
    [config, configRed, configGreen, configBlue, configAlpha].map(async (config, index) => {
      const filePath = path.resolve(rootPath, `generated/${_filePath}`);

      if (!fs.pathExistsSync(filePath)) {
        await fs.mkdirp(filePath);
      }

      const image = await instance.renderToBuffer(config);

      fs.writeFile(path.resolve(filePath, `${index}.png`), image);
    })
  );
};
