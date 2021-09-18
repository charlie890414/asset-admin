import mongoose from 'mongoose';

const crawlerSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
    },
    type: {
        type: String, required: true
    },
    website: {
        type: String, required: true
    },
});

export default mongoose.model('crawler', crawlerSchema);
