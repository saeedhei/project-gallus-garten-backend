import 'dotenv/config';
import nano from 'nano';

const { DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

const encodedCredentials = Buffer.from(`${DB_USER}:${DB_PASS}`).toString('base64');

const dbUrl = `http://${DB_HOST}:${DB_PORT}`;
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
