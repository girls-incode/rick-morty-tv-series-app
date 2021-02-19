import mongoose from 'mongoose';

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`MongoDB connected on  ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

function isValidId(id:any) {
    return mongoose.Types.ObjectId.isValid(id);
}

export default { connect, isValidId };