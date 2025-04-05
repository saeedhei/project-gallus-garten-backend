import  '../core/config/index.js';
import { useDatabase } from '../db/couchdb.js';
const getDB = async () => {
  return await useDatabase(process.env.DB_NAME || 'gallusgarten-poll');
};
export default getDB;
