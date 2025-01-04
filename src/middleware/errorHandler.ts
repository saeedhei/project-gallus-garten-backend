import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
};

// import express from 'express';
// import router from './routes';
// import { errorHandler } from './middleware/errorHandler';

// const app = express();

// app.use(express.json());
// app.use(router);  // Use your router

// // Global error handler
// app.use(errorHandler);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
