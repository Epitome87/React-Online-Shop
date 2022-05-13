import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    const mongooseConnection = await mongoose.connect(process.env.MONGODB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Mongoose connected! ${mongooseConnection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting via Mongoose: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
