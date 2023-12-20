import { Schema } from "mongoose";

const IntegrationSchema = new Schema({
  label: {
    type: String,
    required: [true, "label is required!"],
  },
  status: {
    type: String,
    required: [true, "status is required!"],
  },
  lastSyncAt: {
    type: Date,
  },
});

export default IntegrationSchema;
