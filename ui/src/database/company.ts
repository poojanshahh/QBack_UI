import { Schema } from "mongoose";

const SubFeature = new Schema({
  label: {
    type: String,
    required: [true, "label is required!"],
  },
  description: {
    type: String,
  },
});

const Feature = new Schema({
  label: {
    type: String,
    required: [true, "label is required!"],
  },
  description: {
    type: String,
  },
  subFeatures: [SubFeature],
});

const Product = new Schema({
  label: {
    type: String,
    required: [true, "label is required!"],
  },
  description: {
    type: String,
  },
  aliases: [String],
  features: [Feature],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const CompanySchema = new Schema({
  label: {
    type: String,
    required: [true, "label is required!"],
  },
  priority: {
    type: String,
  },
  products: [Product],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

export default CompanySchema;
