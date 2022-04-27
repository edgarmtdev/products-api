import mongoose from "mongoose";
import { dbName, host } from ".";

const connection = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://${host}/${dbName}`);
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export { connection, mongoose };
