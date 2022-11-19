import sharp from 'sharp';
import { generateChart } from 'utils/chart/index';
import { isResolutionSame } from 'utils/comparator';
import { ASSETS } from 'utils/constant';
import { getPsnr, getRms } from 'utils/math';
import { extractChannels, getMetadata, getResolution } from 'utils/sharp';

const main = async () => {
  const originalInstance = sharp(ASSETS.ORIGINAL);
  const embeddedInstance = sharp(ASSETS.EMBEDDED);

  const image1Channel = await extractChannels(originalInstance);
  const image2Channel = await extractChannels(embeddedInstance);

  const rms = await getRms(image1Channel, image2Channel);
  const psnr = getPsnr(rms);

  const [originalMetadata, embeddedMetadata] = await Promise.all([
    getMetadata(originalInstance),
    getMetadata(embeddedInstance),
  ]);

  const originalResolution = getResolution(originalMetadata);
  const embeddedResolution = getResolution(embeddedMetadata);

  console.log(`Is resolution same? ${isResolutionSame(originalResolution, embeddedResolution)}`);
  console.log(`Original : ${originalResolution.width} x ${originalResolution.height}`);
  console.log(`Embedded : ${embeddedResolution.width} x ${embeddedResolution.height}`);
  console.log(`RMS  \t: ${rms}`);
  console.log(`PSNR \t: ${psnr} dB`);

  await Promise.all([
    generateChart(image1Channel, './original'),
    generateChart(image2Channel, './embedded'),
  ]);
};

main();
