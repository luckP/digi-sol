/**
 * @file user-schema.js
 * @description This file defines the userSchema, which represents a user in the system.
 * 
 * The userSchema captures essential user details, including:
 *  - Name: The full name of the user.
 *  - Email: The email address of the user, which must be unique.
 *  - PhoneNumber: The contact phone number for the user.
 *  - Address: A detailed address of the user, using the imported addressSchema.
 *  - Password: The hashed password for user authentication.
 *  - Photo: An optional field to store the URL or file path of the user's profile picture.
 * 
 * The schema uses Mongoose's `timestamps` option to automatically add `createdAt` and `updatedAt` fields.
 * 
 * @module userSchema
 * @requires mongoose
 * @requires addressSchema
 */

import mongoose from 'mongoose';
import addressSchema from './address-schema.js'; // Import the address schema

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    description: 'The full name of the user' 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    description: 'The email address of the user, must be unique' 
  },
  phoneNumber: { 
    type: String, 
    required: true, 
    description: 'The contact phone number of the user' 
  },
  address: { 
    type: addressSchema, 
    required: true, 
    description: 'The detailed address of the user, using the address schema'
  },
  password: { 
    type: String, 
    required: true, 
    description: 'The hashed password for user authentication' 
  },
  photo: { 
    type: String, 
    description: 'Optional field for the user’s profile picture, stores URL or file path'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.model('User', userSchema);
