// import { useDatabase } from "./couchdb";
// import fs from "fs";

// const dbName = "testart"; // Target database
// const db = useDatabase(dbName);

// const bulkUpload = async () => {
//   try {
//     // Path to your JSON file containing documents
//     const filePath = "../../data/image_data.json";

//     // Read and parse the JSON file
//     const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

//     // Validate that the data is an array of documents
//     if (!Array.isArray(data)) {
//       throw new Error("Data should be an array of documents");
//     }

//     // Use the _bulk_docs API to upload multiple documents
//     const response = await db.bulk({ docs: data });
//     console.log("Bulk upload successful!", response);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error during bulk upload:", error.message);
//     } else {
//       console.error("Unknown error occurred:", error);
//     }
//   }
// };

// // Run the bulk upload
// bulkUpload();
