import mongoose from 'mongoose'
const connection = {}

async function connectDB() {
  if (connection.isConnected) {
    // using old DB connection
    console.log('connected with existing connection');
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_SRV, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    connection.isConnected = db.connections[0].readyState;
    console.log('Connected to Database')
  } catch (error) {
    console.log(error.message)
  }
}

export default connectDB;