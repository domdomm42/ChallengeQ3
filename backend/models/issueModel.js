import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const issueSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Issue = mongoose.model("Issue", issueSchema);
