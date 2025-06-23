import { Schema, model, startSession } from "mongoose";

const SubscriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User ID is required!'], index: true },
    name: { type: Schema.Types.String, trim: true, required: [true, 'Subscription Name is required!'] },
    email: { type: Schema.Types.String, unique: false, required: [true, 'Email is required!'], lowerCase: true },
    price: { type: Schema.Types.Number, required: [true, 'Price is required!'], min: [0, 'Price must be a positive number'] },
    currency: { type: Schema.Types.String, default: 'MMK', enum: ['USD', 'EUR', 'MMK'] },
    frequency: { type: Schema.Types.String, required: [true, 'Frequency is required!'], enum: ['daily', 'weekly', 'monthly', 'yearly'] },
    status: { type: Schema.Types.String, default: 'active', enum: ['active', 'expired', 'cancelled'] },
    paymentMethod: { type: Schema.Types.String, required: [true, 'Payment method is required!'], enum: ['credit_card', 'paypal', 'bank_transfer'] },
    category: { type: Schema.Types.String, required: [true, 'Category is required!'], enum: ['basic', 'premium', 'enterprise'] },
    startDate: {
        type: Schema.Types.Date, required: [true, 'Start date is required!'], validate: {
            validator: function (v) {
                return v <= new Date();
            },
            message: 'Start date cannot be in the future!'
        }
    },
    renewalDate: {
        type: Schema.Types.Date, validate: {
            validator: function (v) {
                return v > this.startDate;
            },
            message: 'Renewal date must be after the start date!'
        }
    },
    cancellationDate: {
        type: Schema.Types.Date, validate: {
            validator: function (v) {
                return !v || v >= this.startDate;
            },
            message: 'Cancellation date must be after the start date!'
        }
    },
    notes: { type: Schema.Types.String, trim: true, maxlength: [500, 'Notes cannot exceed 500 characters'] },
}, {
    timestamps: true,
});


// pre-save hook to renewalDate if not provided
SubscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if (this.renewalDate <= this.startDate) {
        this.status = 'expired';
    }
    next();
});

const SubscriptionModel = model('Subscription', SubscriptionSchema, 'subscriptions');
export default SubscriptionModel;