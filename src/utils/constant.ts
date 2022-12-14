import fs from 'fs-extra';
import path from 'path';

export const rootPath = path.resolve(__dirname, '../..');

export const ASSETS = {
  ORIGINAL: fs.readFileSync(path.resolve(__dirname, '../assets/original.png')),
  EMBEDDED: fs.readFileSync(path.resolve(__dirname, '../assets/embedded.png')),
};
