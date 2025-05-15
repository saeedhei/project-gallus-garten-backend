 import { useDatabase } from "./couchdb.js"; 
// import config from "../core/config/index.js";
// const dbName = config.dbName ||'gallusgarten-poll';//  Target database
// const db = useDatabase(dbName);

export const testConnection = async () => {
  try {
    const db = await useDatabase();
    // Fetch the list of all databases as a connection test
    //
    const dbInfo = await db.info();
    console.log('Connection successful! Database Info:', dbInfo);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to CouchDB:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
  }
};

testConnection();
