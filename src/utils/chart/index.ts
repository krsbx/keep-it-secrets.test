import type { ChartConfiguration } from 'chart.js';
import fs from 'fs-extra';
import path from 'path';
import { rootPath } from 'utils/constant';
import { createChartInstance } from './instance';

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

  const configurationRed: ChartConfiguration = {
    data: {
      labels,
      datasets: [
        {
          label: 'Red',
          data: red,
          fill: false,
          borderColor: 'red',
          borderWidth: 1,
        },
      ],
    },
    type: 'line',
  };

  const configurationGreen: ChartConfiguration = {
    data: {
      labels,
      datasets: [
        {
          label: 'Green',
          data: green,
          fill: false,
          borderColor: 'green',
          borderWidth: 1,
        },
      ],
    },
    type: 'line',
  };

  const configurationBlue: ChartConfiguration = {
    data: {
      labels,
      datasets: [
        {
          label: 'Blue',
          data: blue,
          fill: false,
          borderColor: 'blue',
          borderWidth: 1,
        },
      ],
    },
    type: 'line',
  };

  const configurationAlpha: ChartConfiguration = {
    data: {
      labels,
      datasets: [
        {
          label: 'Alpha',
          data: alpha,
          fill: false,
          borderColor: 'black',
          borderWidth: 1,
        },
      ],
    },
    type: 'line',
  };

  await Promise.all(
    [configurationRed, configurationGreen, configurationBlue, configurationAlpha].map(
      async (config, index) => {
        const filePath = path.resolve(rootPath, `generated/${_filePath}`);

        if (!fs.pathExistsSync(filePath)) {
          await fs.mkdirp(filePath);
        }

        const image = await instance.renderToBuffer(config);

        fs.writeFile(path.resolve(filePath, `${index}.png`), image);
      }
    )
  );
};
