// admin.js (or admin-setup.js)

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';

// Import your models
import User from '../models/user.js';
import Service from '../models/service.js';
import ServiceRequest from '../models/service-request.js';
import Payment from '../models/payment.js';

// Register Mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Configure AdminJS
const adminJs = new AdminJS({
  resources: [
    { resource: User, options: { navigation: { name: 'User Management', icon: 'User' } } },
    { resource: Service, options: { navigation: { name: 'Services', icon: 'Service' } } },
    { resource: ServiceRequest, options: { navigation: { name: 'Service Requests', icon: 'Task' } } },
    { resource: Payment, options: { navigation: { name: 'Payments', icon: 'Payment' } } },
  ],
  rootPath: '/admin',
});

// Add express-session middleware with saveUninitialized option
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      return { email: process.env.ADMIN_EMAIL };
    }
    return null;
  },
  cookiePassword: process.env.COOKIE_SECRET || 'supersecret',
}, null, {
  saveUninitialized: false, // Set this option to avoid the warning
  resave: false,            // Ensures the session is only saved if modified
  secret: process.env.COOKIE_SECRET || 'supersecret', // Use a secure secret
});

export { adminJs, adminRouter };
