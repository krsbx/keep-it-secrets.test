import sharp from 'sharp';
import { isResolutionSame } from 'utils/comparator';
import { ASSETS } from 'utils/constant';
import { getPsnr, getRms } from 'utils/math';
import { getMetadata, getResolution } from 'utils/sharp';

const main = async () => {
  const originalInstance = sharp(ASSETS.ORIGINAL);
  const embeddedInstance = sharp(ASSETS.EMBEDDED);

  const rms = await getRms(originalInstance, embeddedInstance);
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
  console.log(`RMS : ${rms}`);
  console.log(`PSNR : ${psnr} dB`);
};

main();
