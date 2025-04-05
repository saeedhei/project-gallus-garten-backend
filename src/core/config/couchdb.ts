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
 * Initializes or creates a database if it doesn't exist.
 */
const useDatabase = async (dbName: string) => {
  try {
    // Check if the database exists
    // const dbList = await couch.db.list();
    // if (!dbList.includes(dbName)) {
    //   await couch.db.create(dbName);
    //   console.log(`Database "${dbName}" created.`);
    // }

    // Return the database instance
    return couch.use(dbName);
  } catch (error) {
    console.error(`Failed to use database "${dbName}":`, error);
    throw error;
  }
};

const getDB = async () => {
  const dbName = process.env.DB_NAME || 'gallusgarten-poll';
  return await useDatabase(dbName);
};

export { useDatabase, getDB };
