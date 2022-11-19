import type { Sharp } from 'sharp';
import { extractChannels } from './sharp';

export const getRms = async (image1: Sharp, image2: Sharp) => {
  const image1Channel = await extractChannels(image1);
  const image2Channel = await extractChannels(image2);

  const redSumsSqr = image2Channel.red.reduce(
    (prev, curr, index) => prev + Math.pow(curr - image1Channel.red[index], 2),
    0
  );

  const greenSumsSqr = image2Channel.green.reduce(
    (prev, curr, index) => prev + Math.pow(curr - image1Channel.green[index], 2),
    0
  );

  const blueSumsSqr = image2Channel.blue.reduce(
    (prev, curr, index) => prev + Math.pow(curr - image1Channel.blue[index], 2),
    0
  );

  const alphaSumsSqr = image2Channel.alpha.reduce(
    (prev, curr, index) => prev + Math.pow(curr - image1Channel.alpha[index], 2),
    0
  );

  return Math.sqrt(
    (redSumsSqr + greenSumsSqr + blueSumsSqr + alphaSumsSqr) / image1Channel.alpha.length
  );
};

export const getPsnr = (rms: number) => 20 * Math.log10(256 / rms);
