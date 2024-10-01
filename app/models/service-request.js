/**
 * @file service-request.js
 * @description This file defines the serviceRequestSchema, which handles proposals made for a service in the system.
 * 
 * The serviceRequestSchema captures the essential details of a proposal:
 *  - Service: The service this request is linked to.
 *  - Proposer: The user making the proposal for the service.
 *  - ProposedValue: The value being proposed by the proposer.
 *  - ProposedDate: The date when the proposer can perform the service.
 *  - Status: Tracks the status of the request (pending, accepted, or declined).
 *  - ServiceCreator: The user who created the original service and is receiving the proposal.
 * 
 * @module serviceRequestSchema
 * @requires mongoose
 */

import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema({
  service: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    required: true, 
    description: 'The service this request is linked to'
  },
  proposer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    description: 'The user making the proposal'
  },
  proposedValue: { 
    type: Number, 
    required: true, 
    description: 'The value proposed by the user'
  },
  proposedDate: { 
    type: Date, 
    required: true, 
    description: 'The date when the proposer can do the service'
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'declined'], 
    default: 'pending', 
    description: 'The current status of the proposal'
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.model('ServiceRequest', serviceRequestSchema);
