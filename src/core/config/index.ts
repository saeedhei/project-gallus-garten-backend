// src\core\config\index.ts
import path from 'path';
import { config as dotenvConfig } from 'dotenv';
import { projectRoot } from './root.js';

type Environment = 'development' | 'production' | 'test';
const env = (process.env.NODE_ENV || 'development') as Environment;

// Load the correct .env file based on the environment
const envFile = `.env.${env}`;
const envPath = path.resolve(projectRoot, envFile);

dotenvConfig({ path: envPath });
console.log(`Loaded environment variables from: ${envPath}`);

// Dynamic config import
const configurations: Record<Environment, () => Promise<any>> = {
  development: async () => (await import('./development.js')).default,
  production: async () => (await import('./production.js')).default,
  test: async () => (await import('./test.js')).default,
};

const config = await configurations[env]();
export default config;

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

// const config = await configurations[env]();
// export default config;
