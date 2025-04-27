import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      default: "N/A",
    },
    dob: {
      type: String,
      default: "N/A",
    },
    mapAddress: {
      type: String,
      default: "N/A",
    },
    emergencyContactName: {
      type: String,
      require: true,
    },
    emergencyContactNumber: {
      type: String,
      require: true,
    },
    discordProfile: {
      type: String,
      default: "N/A",
    },
    linkedinProfile: {
      type: String,
      require: true,
    },
    githubProfile: {
      type: String,
    },
    post: {
      type: String,
      require: true,
    },
    joinedDate: {
      type: String,
      require: true,
    },
    profileImage: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
