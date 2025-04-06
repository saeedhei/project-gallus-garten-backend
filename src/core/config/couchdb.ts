// import 'dotenv/config';
import nano from 'nano';
import config from './index.js';
// const { DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;
const { dbUser, dbPass, dbHost, dbPort } = config;
// Encode credentials for Basic Auth
const encodedCredentials = Buffer.from(`${dbUser}:${dbPass}`).toString('base64');
// Construct the full URL with auth header
const dbUrl = `http://${dbHost}:${dbPort}`;
const couch = nano({
  url: dbUrl,
  requestDefaults: { headers: { Authorization: `Basic ${encodedCredentials}` } },
});

/**
 * Initializes a database.
 */
const useDatabase = async (dbName = process.env.DB_NAME || 'gallusgarten-poll') => {
  try {
    return await couch.use(dbName);
  } catch (error) {
    console.error(`Failed to use database "${dbName}":`, error);
    throw error;
  }
};

export { useDatabase };
