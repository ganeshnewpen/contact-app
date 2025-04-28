import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "N/A",
    },
    dob: {
      type: String,
      default: "N/A",
    },
    // mapAddress: {
    //   type: String,
    //   default: "N/A",
    // },
    emergencyContactName: {
      type: String,
      required: true,
    },
    emergencyContactNumber: {
      type: String,
      required: true,
    },
    discordProfile: {
      type: String,
      default: "N/A",
    },
    linkedinProfile: {
      type: String,
      required: true,
    },
    githubProfile: {
      type: String,
    },
    post: {
      type: String,
      required: true,
    },
    joinedDate: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
