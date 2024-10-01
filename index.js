import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import winston from 'winston';
import cors from 'cors'; // Import cors middleware
import { adminJs, adminRouter } from './app/config/admin.js'; // Import from admin.js
import apiRoutes from './app/routers/index.js'; // Import API routes

// Logger configuration
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});

// Initialize Express
const app = express();

// Middleware to allow CORS from all origins
app.use(cors()); // Allows requests from any origin

// Middleware to parse incoming JSON requests
app.use(express.json()); // Parses JSON request body and populates req.body

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error', err));

// Use AdminJS
app.use(adminJs.options.rootPath, adminRouter);

app.use('/', (rer, res) => {
  res.send('Welcome to the Express API asdfasdfasdfasdfafsd');
});

// Use API routes
app.use('/api', apiRoutes);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Global error-handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack); // Log the error for debugging purposes
  res.status(500).json({ message: 'Something went wrong!', error: err.message }); // Send a generic error message
});

// Express app listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app; // Export the app as default
