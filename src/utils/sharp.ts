import type { Metadata, Sharp } from 'sharp';

export const getMetadata = (instance: Sharp) => instance.metadata();

export const getResolution = (metadata: Metadata) => ({
  width: metadata.width as number,
  height: metadata.height as number,
});

export const extractChannels = async (instance: Sharp) => {
  const totalChannels = (await instance.toBuffer({ resolveWithObject: true })).info.channels;

  // Read, Green, Blue, Alpha
  const channels: Buffer[] = [];

  for (let i = 0; i < totalChannels; i++) {
    channels.push(await instance.extractChannel(i).raw().toBuffer());
  }

  // Alpha is not exists
  if (totalChannels < 4) channels[3] = Buffer.alloc(channels[0].length).fill(255);

  return {
    red: channels[0],
    green: channels[1],
    blue: channels[2],
    alpha: channels[3],
  };
};
