import mongoose from "mongoose";
import {
  dbName,
  dbPassword,
  dbUsername,
  host
} from ".";

const URI = `mongodb+srv://${dbUsername}:${dbPassword}@${host}/${dbName}?retryWrites=true&w=majority`

const connection = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export { connection, mongoose };