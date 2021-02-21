import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    token: String,
    expires: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

RefreshTokenSchema.virtual('isExpired').get(function () {
    // @ts-ignore
    return Date.now() >= this.expires;
});

export default mongoose.model('RefreshToken', RefreshTokenSchema);