import mongoose from "mongoose";

let connectionPromise;

const connectDB = () => {
    if (mongoose.connection.readyState === 1) {
        console.log(`MongoDB Connected:  ${mongoose.connection.host}`);
        return Promise.resolve(mongoose.connection);
    }

    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(process.env.MONGO_URL)
            .then((mongooseInstance) => {
                console.log(
                    `MongoDB Connected: ${mongooseInstance.connection.host}`
                );

                return mongooseInstance.connection;
            })
            .catch((error) => {
                connectionPromise = undefined;
                throw error;
            });
    }

    return connectionPromise;
};

export default connectDB;