import { Schema } from "mongoose";
const { String: SchemaString, ObjectId, Boolean: SchemaBoolean } = Schema.Types;

const IntelSchema = new Schema({
  title: {
    type: SchemaString,
  },
  content: {
    type: SchemaString,
    required: [true, "Content is required."],
  },
  type: {
    type: SchemaString,
    required: [true, "Type is required."],
  },
  source: {
    type: SchemaString,
    required: [true, "Source is required."],
  },
  summary: {
    type: SchemaString,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: ObjectId,
    ref: "User",
  },
  deleted: {
    type: SchemaBoolean,
    default: false,
  },
});

export default IntelSchema;
