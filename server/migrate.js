import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: "N/A" },
    dob: { type: Date, default: null }, // Changed to Date
    emergencyContactName: { type: String, default: "N/A" }, // Changed to optional
    emergencyContactNumber: { type: String, default: "N/A" }, // Changed to optional
    discordProfile: { type: String, default: "N/A" },
    linkedinProfile: { type: String, default: "N/A" }, // Changed to optional
    githubProfile: { type: String, default: "N/A" }, // Added default
    post: { type: String, default: "N/A" }, // Changed to optional
    joinedDate: { type: Date, default: null }, // Changed to Date
    profileImage: { type: String, default: "N/A" }, // Changed to optional
    mapAddress: { type: String, default: "N/A" },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
