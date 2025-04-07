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

const useDatabase = async (dbName: string = process.env.DB_NAME as string) => {
  try {
    return couch.use(dbName);
  } catch (error) {
    console.error(`Failed to use database "${dbName}":`, error);
    throw error;
  }
};

export { useDatabase };
