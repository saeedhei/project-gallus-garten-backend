import * as fs from 'fs-extra';
import * as path from 'path';

const directoriesToCopy = [
  {
    src: path.resolve(__dirname, '../src/views'),
    dest: path.resolve(__dirname, '../dist/src/views'),
  },
  {
    src: path.resolve(__dirname, '../src/public'),
    dest: path.resolve(__dirname, '../dist/src/public'),
  },
];

async function copyDirectory(src: string, dest: string) {
  try {
    await fs.copy(src, dest);
    console.log(`Copied files from ${src} to ${dest}`);
  } catch (error) {
    console.error(`Error during file copy: ${(error as Error).message}`);
  }
}

(async () => {
  for (const dir of directoriesToCopy) {
    await copyDirectory(dir.src, dir.dest);
  }
})();
