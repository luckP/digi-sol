/**
 * @file service-schema.js
 * @description This file defines the serviceSchema, which represents a service that can be created and requested by users.
 * 
 * The serviceSchema captures the essential details of a service, including:
 *  - Name: The name of the service.
 *  - Description: A detailed description of the service being offered.
 *  - Value: The initial value set by the service creator.
 *  - Location: The address where the service is needed, using the addressSchema.
 *  - ServiceType: The type/category of service, selected from predefined options.
 *  - ProposedValue: An optional field where a new value can be proposed during the negotiation phase.
 *  - Creator: A reference to the user who created the service.
 *  - Status: The current status of the service, which can be 'open', 'accepted', or 'completed'.
 *  - AcceptedBy: A reference to the user who accepts the service.
 *  - Images: An array of image URLs or paths to show the subject of the service.
 * 
 * The schema uses Mongoose's `timestamps` option to automatically add `createdAt` and `updatedAt` fields.
 * 
 * @module serviceSchema
 * @requires mongoose
 * @requires addressSchema
 */

import mongoose from 'mongoose';
import addressSchema from './address-schema.js'; // Import the address schema

const serviceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    description: 'The name of the service being created' 
  },
  description: { 
    type: String, 
    required: true, 
    description: 'Detailed description of the service' 
  },
  value: { 
    type: Number, 
    required: true, 
    description: 'The initial value set by the service creator' 
  },
  location: { 
    type: addressSchema, 
    required: true, 
    description: 'Location where the service will be performed, using the address schema' 
  },
  serviceType: { 
    type: String, 
    enum: ['plumber', 'TI', 'cleaning', 'transport', 'administrative', 'auto repair', 'repair', 'wellness', 'animal'], 
    required: true, 
    description: 'Type of service, chosen from a list of predefined options' 
  },
  proposedValue: { 
    type: Number, 
    description: 'A new proposed value during the negotiation phase' 
  },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    description: 'Reference to the user who created the service' 
  },
  status: { 
    type: String, 
    enum: ['open', 'accepted', 'completed', 'canceled'], 
    default: 'open', 
    description: 'Current status of the service' 
  },
  acceptedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    description: 'Reference to the user who accepted the service' 
  },
  images: [{ 
    type: String, 
    description: 'Array of image URLs or paths associated with the service' 
  }]
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.model('Service', serviceSchema);
