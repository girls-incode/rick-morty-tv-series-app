import mongoose from 'mongoose';
import CharacterSchema from './character';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: {
        type: [CharacterSchema.schema]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc:any, ret:any) {
        // delete ret._id;
        delete ret.password;
    }
});

export default mongoose.model('Users', UserSchema);