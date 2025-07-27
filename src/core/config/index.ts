// src\core\config\index.ts
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envName = process.env.NODE_ENV || 'development';
const envFile = `.env.${envName}`;

let projectRoot: string;

if (__dirname.includes('/dist') || __dirname.includes('\\dist')) {
  projectRoot = path.resolve(__dirname, '..');
} else {
  projectRoot = path.resolve(__dirname, '..', '..', '..');
}

// مسیر فایل env واقعی
const envPath = path.resolve(projectRoot, envFile);

// لاگ مسیر
console.log(`Loading environment variables from: ${envPath}`);

// Load فایل env به صورت دستی
dotenv.config({ path: envPath });

type Environment = 'development' | 'production' | 'test';
const env = envName as Environment;

const configurations = {
  development: async () => (await import('./development.js')).default,
  production: async () => (await import('./production.js')).default,
  test: async () => (await import('./test.js')).default,
};

export default await configurations[env]();
// import path from 'path';
// import { fileURLToPath } from 'url';
// import 'dotenv/config';
// // Load environment-specific .env file
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const envName = process.env.NODE_ENV || 'development';
// const envFile = `.env.${envName}`;
// const envPath = path.resolve(__dirname, '../../../', envFile);

// console.log(`Loading environment variables from: ${envPath}`);

// type Environment = 'development' | 'production' | 'test';
// const env = (process.env.NODE_ENV || 'development') as Environment;

// // Dynamic import
// const configurations = {
//   development: async () => (await import('./development.js')).default,
//   production: async () => (await import('./production.js')).default,
//   test: async () => (await import('./test.js')).default,
// };

// // const config = await configurations[env]();
// // export default config;
// export default await configurations[env]();
