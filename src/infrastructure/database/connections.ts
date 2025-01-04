import nano from 'nano';
// import config from '../../core/config';

// const couchDbUrl = config.database.couchDb.url; // From the environment-specific config
// const couchDbName = config.database.couchDb.name; // From the environment-specific config
const couchDbUrl = 'http://admin:securepassword123@localhost:5984'; // From the environment-specific config
const couchDbName = 'gallusgarten'; // From the environment-specific config

const couch = nano(couchDbUrl);

export const connectToDatabase = () => {
  return couch.db.use(couchDbName);
};

export default couch;
