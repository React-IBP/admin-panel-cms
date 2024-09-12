import mongoose from "mongoose";

export const ConnectDB = async () => {
    const stringConnection = process.env.MONGODB_URI;

    try {
        await mongoose.connect(stringConnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000, // Tiempo de espera para la conexión
            serverSelectionTimeoutMS: 30000, // Tiempo de espera para la selección del servidor
            socketTimeoutMS: 30000 // Tiempo de espera para las operaciones en el socket
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};
