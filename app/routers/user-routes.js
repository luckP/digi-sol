/**
 * @file user-routes.js
 * @description This file defines routes for user registration with image uploads and user login functionality.
 * 
 * The following routes are available:
 *  - POST /register: Allows a new user to register with the ability to upload a profile image.
 *  - POST /login: Allows a registered user to log in with email and password.
 * 
 * Each user contains details such as name, email, phone number, address, password, and an optional profile image.
 * 
 * @module userRoutes
 * @requires express
 * @requires multer
 * @requires User
 */

import express from 'express';
import multer from 'multer';
import User from '../models/user.js'; // Import User model

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
 * @route POST /register
 * @description Allows a new user to register, with the option to upload a profile photo.
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} phoneNumber - The phone number of the user.
 * @param {object} address - The address of the user (can be detailed or structured).
 * @param {string} password - The password for the user's account.
 * @param {file} photo - (Optional) The profile photo to be uploaded.
 * @returns {Object} The newly created user document.
 * @throws {500} If there is an error registering the user.
 */
router.post('/register', upload.single('photo'), async (req, res) => {
    try {
        const { name, email, phoneNumber, address, password } = req.body;
        const photo = req.file ? req.file.path : null; // Get the file path of the uploaded image

        const user = new User({ name, email, phoneNumber, address, password, photo });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

/**
 * @route POST /login
 * @description Allows a registered user to log in by providing email and password.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user's account.
 * @returns {Object} A message indicating successful login along with the user document.
 * @throws {400} If the credentials are invalid.
 * @throws {500} If there is an error logging in.
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

export default router;
