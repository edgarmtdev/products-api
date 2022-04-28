import { Schema, model } from "mongoose";

const rolScheme = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", rolScheme);
