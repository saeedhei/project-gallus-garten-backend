// import express, { Request, Response, Router } from 'express';
// import { useDatabase } from '../../Database/couchdb';

// const router = express.Router();
// const dbName = "tesart";
// const db = useDatabase(dbName);

// // Route to get likes for a specific image by publicId
// router.get('/likes/:id', async (req: Request<{ id: string }>, res: Response) => {
//   const { id } = req.params;

//   try {
//     // Find the image by publicId in CouchDB
//     const response = await db.find({
//       selector: { publicId: id },
//     });

//     if (response.docs.length === 0) {
//       return res.status(404).json({ error: 'Image not found' });
//     }

//     const image = response.docs[0] as { _id: string; _rev: string; likes?: number };
//     res.json({ likes: image.likes ?? 0 }); // Return likes count, default to 0 if undefined
//   } catch (error) {
//     console.error("Error fetching image likes:", error);
//     res.status(500).json({ error: "Error fetching image likes" });
//   }
// });

// export default router;


// curl http://89.117.54.249:5002/api/images?page=1