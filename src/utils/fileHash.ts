import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v1 } from 'uuid';

export const calculateFileHash = async (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha1');
    const stream = createReadStream(filePath);

    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
};

export const overlayImage = async (imageBuffer: Buffer) => {
  const overlayPath = path.resolve(__dirname, '../../public/assets/images/overlay.png');

  const image = sharp(imageBuffer);
  const overlay = sharp(overlayPath);

  const result = await image.composite([
    {
      input: await overlay.toBuffer(),
      gravity: 'center'
    }
  ]).toBuffer();

  return result;
}