import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    currency: {
        type: String,
    },
    currentPrice: {
        type: Number,
    },
    exchange: {
        type: Number,
    },
    cost: {
        type: Number,
    },
    amount: {
        type: Number,
    },
});

const recordSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: String,
        index: true,
        required: true
    },
    info: {
        type: [unitSchema],
        required: true
    }
});

export default mongoose.model('record', recordSchema);
