/**
 * @file service-request-routes.js
 * @description This file defines routes related to service requests, allowing users to create proposals (service requests) for a service and fetch all service requests for a particular service.
 * 
 * The following routes are available:
 *  - POST /request: Allows a user to create a new service request (proposal).
 *  - GET /:serviceId: Fetches all service requests (proposals) for a specific service.
 * 
 * A service request (proposal) contains details such as the service ID, proposer ID, proposed value, and date when the service can be performed.
 * 
 * @module serviceRequestRoutes
 * @requires express
 * @requires ServiceRequest
 */

import express from 'express';
import ServiceRequest from '../models/service-request.js'; // Import ServiceRequest model

const router = express.Router();

/**
 * @route POST /request
 * @description Creates a new service request (proposal) for a service.
 * @param {string} service - The ID of the service for which the request is made.
 * @param {string} proposer - The ID of the user making the proposal.
 * @param {number} proposedValue - The value being proposed by the user.
 * @param {date} proposedDate - The date when the proposer can perform the service.
 * @param {string} serviceCreator - The ID of the user who created the original service.
 * @returns {Object} The newly created service request (proposal) document.
 * @throws {500} If there is an error creating the service request.
 */
router.post('/request', async (req, res) => {
    try {
        const { service, proposer, proposedValue, proposedDate, serviceCreator } = req.body;
        const serviceRequest = new ServiceRequest({ service, proposer, proposedValue, proposedDate, serviceCreator });
        await serviceRequest.save();
        res.status(201).json(serviceRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service request', error });
    }
});

/**
 * @route GET /:serviceId
 * @description Fetches all service requests (proposals) for a specific service.
 * @param {string} serviceId - The ID of the service for which the service requests are fetched.
 * @returns {Array} An array of service request documents.
 * @throws {500} If there is an error fetching the service requests.
 */
router.get('/:serviceId', async (req, res) => {
    try {
        const { serviceId } = req.params;
        const serviceRequests = await ServiceRequest.find({ service: serviceId });
        res.status(200).json(serviceRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service requests', error });
    }
});

export default router;
