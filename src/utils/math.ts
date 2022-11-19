export const getRms = async (image1: KIS.TypeRGBA, image2: KIS.TypeRGBA) => {
  const redSumsSqr = image2.red.reduce(
    (prev, curr, index) => prev + Math.pow(curr - image1.red[index], 2),
    0
  );

  const greenSumsSqr = image2.green.reduce(
    (prev, curr, index) => prev + Math.pow(curr - image1.green[index], 2),
    0
  );

  const blueSumsSqr = image2.blue.reduce(
    (prev, curr, index) => prev + Math.pow(curr - image1.blue[index], 2),
    0
  );

  const alphaSumsSqr = image2.alpha.reduce(
    (prev, curr, index) => prev + Math.pow(curr - image1.alpha[index], 2),
    0
  );

  return Math.sqrt((redSumsSqr + greenSumsSqr + blueSumsSqr + alphaSumsSqr) / image1.alpha.length);
};

export const getPsnr = (rms: number) => 20 * Math.log10(256 / rms);
