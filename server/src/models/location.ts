import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
});

export default mongoose.model('Location', LocationSchema);