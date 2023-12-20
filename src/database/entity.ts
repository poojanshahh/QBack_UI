import { Schema } from "mongoose";

const EntitySchema = new Schema({
  label: {
    type: String,
    required: [true, "label is required!"],
  },
  category: {
    type: String,
    required: [true, "type is required!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

export default EntitySchema;
