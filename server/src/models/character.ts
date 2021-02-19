import mongoose from 'mongoose';
// import LocationSchema from './location';

const CharacterSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    origin: {
        name: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    location: {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    image: {
        type: String,
    },
    episode: [String],
    url: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    }
});

export default mongoose.model('Character', CharacterSchema);