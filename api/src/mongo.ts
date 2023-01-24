import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

async function connect() {
    const connectionString = process.env.MONGO_DB_URL;
    try {
        await mongoose.connect(connectionString as string);
        console.log("Db conectada");
    } catch (_error) {
        process.on('uncaughtException', err => {
            console.error(err, 'Uncaught Exception thrown');
            process.exit(1);
        });
    }
}

export default connect;