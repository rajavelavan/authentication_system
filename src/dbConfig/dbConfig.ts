import mongoose from 'mongoose';

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected Successfully');
    });

    connection.on('error', (err) => {
      console.log(
        'mongoDB connection error. Please make sure MongoDB is running. ' + err
      );
      process.exit();
    });
  } catch (error) {
    console.log('Somthing went wrong!');
    console.log(error);
  }
}
