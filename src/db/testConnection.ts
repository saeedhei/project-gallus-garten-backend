import { useDatabase } from "./couchdb";

const dbName = "testart"; // Target database
const db = useDatabase(dbName);

const testConnection = async () => {
  try {
    // Fetch the list of all databases as a connection test
    const dbList = await db.info();
    console.log("Connection successful! Database Info:", dbList);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error connecting to CouchDB:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
  }
};

testConnection();
