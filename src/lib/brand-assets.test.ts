import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

describe('Department brand images', () => {
  it.each(['india-emblem.png', 'maha-seal.png', 'ekatma-logo.png'])(
    '%s is a browser-readable PNG, not a Git LFS pointer',
    filename => {
      const image = readFileSync(`public/assets/${filename}`);
      expect(image.subarray(0, pngSignature.length)).toEqual(pngSignature);
    },
  );
});
