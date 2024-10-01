/**
 * @file payment-routes.js
 * @description This file defines routes related to payments for services, including creating new payments and fetching all payments.
 * 
 * The following routes are available:
 *  - POST /pay: Creates a new payment associated with a service, customer, and provider.
 *  - GET /: Retrieves all payments stored in the system.
 * 
 * Each payment includes details about the service being paid for, the customer making the payment, 
 * the provider receiving the payment, the payment method, and the status of the payment.
 * 
 * @module paymentRoutes
 * @requires express
 * @requires Payment
 */

import express from 'express';
import Payment from '../models/payment.js'; // Import Payment model

const router = express.Router();

/**
 * @route POST /pay
 * @description Creates a new payment for a service.
 * @param {string} service - The ID of the service being paid for.
 * @param {string} customer - The ID of the customer making the payment.
 * @param {string} provider - The ID of the service provider receiving the payment.
 * @param {number} amount - The amount being paid.
 * @param {string} paymentMethod - The method of payment (e.g., 'card', 'bank transfer').
 * @param {string} paymentProviderId - The payment provider's ID for the transaction (e.g., Stripe ID).
 * @returns {Object} The newly created payment document.
 * @throws {500} If there is an error processing the payment.
 */
router.post('/pay', async (req, res) => {
    try {
        const { service, customer, provider, amount, paymentMethod, paymentProviderId } = req.body;
        const payment = new Payment({ service, customer, provider, amount, paymentMethod, paymentProviderId });
        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error processing payment', error });
    }
});

/**
 * @route GET /
 * @description Fetches all payments from the system.
 * @returns {Array} An array of payment documents.
 * @throws {500} If there is an error fetching the payments.
 */
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error });
    }
});

export default router;
