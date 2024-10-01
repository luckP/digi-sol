/**
 * @file service-routes.js
 * @description This file defines routes for managing services, including creating services with multiple image uploads, updating service details, and fetching all services.
 * 
 * The following routes are available:
 *  - POST /create: Creates a new service with the ability to upload multiple images.
 *  - PUT /update/:serviceId: Updates specific fields of an existing service (such as status, name, etc.).
 *  - GET /: Fetches all services stored in the system.
 * 
 * A service can contain details such as name, description, value, location, type, creator, and a list of images.
 * 
 * @module serviceRoutes
 * @requires express
 * @requires multer
 * @requires Service
 */

import express from 'express';
import multer from 'multer';
import Service from '../models/service.js'; // Import Service model

const router = express.Router();

/**
 * Set up Multer for file uploads. This configuration stores uploaded images in the 'uploads/' directory and ensures 
 * that only image files (jpeg, jpg, png, gif) are allowed. It generates a unique filename for each file.
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

// Multer configuration to allow image uploads and filter file types
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.split('.').pop());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('File upload only supports the following filetypes - ' + filetypes));
  }
});

/**
 * @route POST /create
 * @description Creates a new service with multiple image uploads (up to 10 images). Service data and images are both stored.
 * @param {string} name - The name of the service.
 * @param {string} description - A description of the service.
 * @param {number} value - The monetary value of the service.
 * @param {object} location - The location where the service will be provided.
 * @param {string} serviceType - The type/category of the service (e.g., plumber, TI, cleaning).
 * @param {string} creator - The ID of the user who created the service.
 * @param {Array} images - An array of image files uploaded by the user.
 * @returns {Object} The newly created service document, including the list of image paths.
 * @throws {500} If there is an error creating the service or uploading the images.
 */
router.post('/create', upload.array('images', 10), async (req, res) => { // Handle up to 10 images
    try {
        const { name, description, value, location, serviceType, creator } = req.body;
        const images = req.files.map(file => file.path); // Store paths of uploaded images

        const service = new Service({ 
          name, 
          description, 
          value, 
          location, 
          serviceType, 
          creator, 
          images 
        });

        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
});

/**
 * @route PUT /update/:serviceId
 * @description Updates an existing service, allowing updates to various fields like status, name, description, etc.
 * @param {string} serviceId - The ID of the service to be updated.
 * @param {Object} req.body - The fields that should be updated (e.g., status, value, name).
 * @returns {Object} The updated service document.
 * @throws {404} If the service is not found.
 * @throws {500} If there is an error updating the service.
 */
router.put('/update/:serviceId', async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        const updateFields = req.body; // Fields to update (e.g., status, name, description, etc.)

        const updatedService = await Service.findByIdAndUpdate(
            serviceId,
            { $set: updateFields }, // Only update the fields that are provided
            { new: true, runValidators: true } // Return the updated document and validate the changes
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service', error });
    }
});

/**
 * @route GET /
 * @description Fetches all services stored in the system.
 * @returns {Array} An array of service documents.
 * @throws {500} If there is an error fetching the services.
 */
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error });
    }
});

export default router;
