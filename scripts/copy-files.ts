import { promises as fsPromises } from 'fs';
import * as fs from 'fs';
import * as path from 'path';

const srcDir = path.resolve(__dirname, '../views');
const destDir = path.resolve(__dirname, '../dist/views');

/**
 * Recursively copies a directory from the source to the destination.
 * @param src - The source directory.
 * @param dest - The destination directory.
 */
async function copyDirectory(src: string, dest: string): Promise<void> {
  try {
    // Ensure destination exists
    await fsPromises.mkdir(dest, { recursive: true });

    const entries = await fsPromises.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        // Recursively copy subdirectory
        await copyDirectory(srcPath, destPath);
      } else {
        // Copy file
        await fsPromises.copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    handleError(error);
  }
}

/**
 * Handles errors in a type-safe way.
 * @param error - The unknown error to handle.
 */
function handleError(error: unknown): void {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  } else {
    console.error(`Unknown error: ${JSON.stringify(error)}`);
  }
}

// Run the copy script
(async () => {
  try {
    await copyDirectory(srcDir, destDir);
    console.log(`Copied files from ${srcDir} to ${destDir}`);
  } catch (error) {
    handleError(error);
  }
})();
