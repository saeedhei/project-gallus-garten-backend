// src\core\config\couchdb.ts
import nano from 'nano';
import config from './index.js';
const { dbUser, dbPass, dbHost, dbPort } = config;
// Encode credentials for Basic Auth
const encodedCredentials = Buffer.from(`${dbUser}:${dbPass}`).toString('base64');
const dbUrl = `http://${dbHost}:${dbPort}`;
const couch = nano({
  url: dbUrl,
  requestDefaults: { headers: { Authorization: `Basic ${encodedCredentials}` } },
});

const useDatabase = (dbName: string = process.env.DB_NAME as string) => {
  return couch.use(dbName);
};
export { useDatabase };
