import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "N/A",
    },
    head: {
      type: String,
      default: "N/A",
    },
  },
  { timestamps: true }
);

// Indexes
departmentSchema.index({ name: 1 }, { unique: true });
departmentSchema.index({ head: 1 });

export default mongoose.model("Department", departmentSchema);
