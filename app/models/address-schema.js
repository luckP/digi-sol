/**
 * @file address-schema.js
 * @description This file defines the addressSchema used to represent a detailed address in other Mongoose schemas.
 * 
 * The addressSchema is designed to capture the essential components of an address, including:
 *  - Street: The street name where the service or user is located.
 *  - City: The city where the address resides.
 *  - State: The state or region.
 *  - PostalCode: The postal or ZIP code for the location.
 *  - Country: The country of the address.
 *  - Number: The building number for the address.
 * 
 * This schema is intended for use as a subdocument schema in other models, such as User and Service, 
 * to provide a more structured address format.
 * 
 * @module addressSchema
 * @requires mongoose
 */

import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true, description: 'Street name for the address' },
  city: { type: String, required: true, description: 'City for the address' },
  state: { type: String, required: true, description: 'State or region for the address' },
  postalCode: { type: String, required: true, description: 'Postal or ZIP code for the address' },
  country: { type: String, required: true, description: 'Country for the address' },
  number: { type: String, required: true, description: 'Building or house number for the address' }
});

export default addressSchema;
