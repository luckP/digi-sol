import express from 'express';
import userRoutes from './user-routes.js';
import serviceRoutes from './service-routes.js';
import serviceRequestRoutes from './service-request-routes.js';
import paymentRoutes from './payment-routes.js';

const router = express.Router();

// Redirecting to respective routes
router.use('/users', userRoutes);
router.use('/services', serviceRoutes);
router.use('/service-requests', serviceRequestRoutes);
router.use('/payments', paymentRoutes);

// Catch-all route for undefined routes
router.all('*', (req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

export default router;
