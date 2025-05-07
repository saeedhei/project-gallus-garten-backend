import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Nur nötig, wenn du __dirname noch für andere Zwecke brauchst
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const algorithm = 'aes-256-cbc';
const ivLength = 16;

// Derive a 256-bit key from the password using SHA-256
function getKeyFromPassword(password: string): Buffer {
  return crypto.createHash('sha256').update(password).digest();
}

// Encrypt a file
function encryptFile(inputPath: string, outputPath: string, password: string): void {
  const key = getKeyFromPassword(password);
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const input = fs.readFileSync(inputPath);
  const encrypted = Buffer.concat([iv, cipher.update(input), cipher.final()]);

  fs.writeFileSync(outputPath, encrypted);
  console.log(`Encrypted: ${outputPath}`);
}

// Decrypt a file
function decryptFile(inputPath: string, outputPath: string, password: string): void {
  const key = getKeyFromPassword(password);
  const input = fs.readFileSync(inputPath);

  const iv = input.slice(0, ivLength);
  const encryptedText = input.slice(ivLength);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);

  fs.writeFileSync(outputPath, decrypted);
  console.log(`Decrypted: ${outputPath}`);
}

// CLI usage: Get mode (encrypt/decrypt), password, and filename from environment variables
const mode = process.argv[2]; // 'encrypt' or 'decrypt'
const password = process.env.PASSWORD; // Password from environment variable
const filename = process.env.ENV; // File to be encrypted or decrypted

if (!mode || !filename || !password) {
  console.error('Usage: npm run encrypt or decrypt with PASSWORD and ENV environment variables.');
  process.exit(1);
}

const inputPath = path.resolve(process.cwd(), filename);
const outputPath = path.resolve(
  process.cwd(),
  mode === 'encrypt' ? `${filename}.enc` : filename.replace(/\.enc$/, ''),
);

try {
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file does not exist: ${inputPath}`);
    process.exit(1);
  }

  if (mode === 'encrypt') {
    encryptFile(inputPath, outputPath, password);
  } else if (mode === 'decrypt') {
    decryptFile(inputPath, outputPath, password);
  } else {
    console.error('Mode must be "encrypt" or "decrypt".');
    process.exit(1);
  }
} catch (err) {
  console.error('Error:', (err as Error).message);
}
