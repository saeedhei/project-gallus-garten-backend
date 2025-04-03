// import 'dotenv/config';
import nano from 'nano';
import config from '../core/config/index.js';
// const { DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;
const { dbUser, dbPass, dbHost, dbPort } = config
const encodedCredentials = Buffer.from(`${dbUser}:${dbPass}`).toString('base64');

const dbUrl = `http://${dbHost}:${dbPort}`;
const couch = nano({
  url: dbUrl,
  requestDefaults: {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  },
});

const useDatabase = (dbName: string) => {
  return couch.use(dbName);
};

export { useDatabase };
