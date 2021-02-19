import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    token: String,
    expires: Date,
    created: {
        type: Date,
        default: Date.now
    },
    revoked: Date,
});

RefreshTokenSchema.virtual('isExpired').get(function () {
    // @ts-ignore
    return Date.now() >= this.expires;
});

RefreshTokenSchema.virtual('isActive').get(function () {
    // @ts-ignore
    return !this.revoked && !this.isExpired;
});

export default mongoose.model('RefreshToken', RefreshTokenSchema);