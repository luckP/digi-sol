import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import winston from 'winston';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';


// Logger configuration
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});

// Initialize Express
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error', err));

// AdminJS setup
AdminJS.registerAdapter(AdminJSMongoose);
const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: '/admin',
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Express app listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
