import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';

export const projectRoot =
  env === 'production' ? path.resolve(__dirname) : path.resolve(__dirname, '../../../');

// import { fileURLToPath } from 'url';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const env = process.env.NODE_ENV || 'development';

// export const projectRoot =
//   env === 'production' ? path.resolve(__dirname, '../') : path.resolve(__dirname, '../../../');
