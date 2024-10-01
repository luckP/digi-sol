/**
 * @file payment.js
 * @description This file defines the paymentSchema, which is used to track payments for services in the system.
 * 
 * The paymentSchema captures the essential details of a payment transaction:
 *  - Service: The service being paid for, referenced by its ObjectId.
 *  - Customer: The user who made the payment, referenced by their ObjectId.
 *  - Provider: The service provider who will receive the payment, referenced by their ObjectId.
 *  - Amount: The total amount paid for the service.
 *  - PaymentMethod: Describes the method of payment, such as 'card', 'bank transfer', etc.
 *  - PaymentStatus: Tracks the payment status, which can be 'pending', 'completed', or 'failed'.
 *  - PaymentProviderId: Stores the ID from payment providers (e.g., Stripe) to track the transaction.
 *  - PaymentDate: Automatically set to the date when the payment is made.
 * 
 * The schema uses Mongoose's built-in `timestamps` option to automatically add `createdAt` and `updatedAt` fields.
 * 
 * @module paymentSchema
 * @requires mongoose
 */

import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    service: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service', 
        required: true, 
        description: 'The service being paid for, referenced by ObjectId'
    },
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        description: 'The customer who made the payment, referenced by ObjectId' 
    },
    provider: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        description: 'The service provider receiving the payment, referenced by ObjectId'
    },
    amount: { 
        type: Number, 
        required: true, 
        description: 'The amount paid for the service'
    },
    paymentMethod: { 
        type: String, 
        description: 'Method of payment, such as "card" or "bank transfer"'
    },
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'failed'], 
        default: 'pending', 
        description: 'The status of the payment, e.g., pending, completed, or failed'
    },
    paymentProviderId: { 
        type: String, 
        description: 'ID from the payment provider (e.g., Stripe) to track the transaction'
    },
    paymentDate: { 
        type: Date, 
        default: Date.now, 
        description: 'The date when the payment was made'
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.model('Payment', paymentSchema);
