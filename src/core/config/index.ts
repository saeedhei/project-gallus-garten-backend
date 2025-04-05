import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
// Load environment-specific .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const envName = process.env.NODE_ENV || 'development';
const envFile = `.env.${envName}`;
const envPath = path.resolve(__dirname, '../../../', envFile);

console.log(`Loading environment variables from: ${envPath}`);
dotenv.config({ path: envPath });

type Environment = 'development' | 'production' | 'test';
const env = (process.env.NODE_ENV || 'development') as Environment;

// Dynamic import
const configurations = {
  development: async () => (await import('./development.js')).default,
  production: async () => (await import('./production.js')).default,
  test: async () => (await import('./test.js')).default,
};

// const config = await configurations[env]();
// export default config;
export default await configurations[env]();