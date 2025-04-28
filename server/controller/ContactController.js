import asyncHandler from "express-async-handler";
import Contact from "../models/contact.js";

// Create a new contact
const createContact = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    dob,
    post,
    joinedDate,
    profileImage,
    discordProfile,
    githubProfile,
    linkedinProfile,
    emergencyContactName,
    emergencyContactNumber,
  } = req.body;

  if (!name || !email || !phone || !address) {
    return res.status(400).json({
      success: false,
      message: "Name, email, phone, and address are required!",
    });
  }

  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      address,
      dob,
      post,
      joinedDate,
      profileImage,
      discordProfile,
      githubProfile,
      linkedinProfile,
      emergencyContactName,
      emergencyContactNumber,
    });

    console.log(newContact);

    return res.status(201).json({
      success: true,
      message: "Contact info created/saved successfully!",
      data: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        phone: newContact.phone,
        address: newContact.address,
        dob: newContact.dob,
        post: newContact.post,
        joinedDate: newContact.joinedDate,
        profileImage: newContact.profileImage,
        discordProfile: newContact.discordProfile,
        githubProfile: newContact.githubProfile,
        linkedinProfile: newContact.linkedinProfile,
        emergencyContactName: newContact.emergencyContactName,
        emergencyContactNumber: newContact.emergencyContactNumber,
      },
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

// Update a contact by ID
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    address,
    dob,
    post,
    joinedDate,
    profileImage,
    discordProfile,
    githubProfile,
    linkedinProfile,
    emergencyContactName,
    emergencyContactNumber,
  } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !address) {
    return res.status(400).json({
      success: false,
      message: "Name, email, phone, and address are required!",
    });
  }

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Contact ID is required",
    });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        address,
        dob,
        post,
        joinedDate,
        profileImage,
        discordProfile,
        githubProfile,
        linkedinProfile,
        emergencyContactName,
        emergencyContactNumber,
      },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      id: updatedContact._id,
      name: updatedContact.name,
      email: updatedContact.email,
      phone: updatedContact.phone,
      address: updatedContact.address,
      dob: updatedContact.dob,
      post: updatedContact.post,
      joinedDate: updatedContact.joinedDate,
      profileImage: updatedContact.profileImage,
      discordProfile: updatedContact.discordProfile,
      githubProfile: updatedContact.githubProfile,
      linkedinProfile: updatedContact.linkedinProfile,
      emergencyContactName: updatedContact.emergencyContactName,
      emergencyContactNumber: updatedContact.emergencyContactNumber,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

// Get all contacts
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()
    .sort({ createdAt: -1 })
    .select({ __v: 0 });
  const formattedData = contacts.map((c) => ({
    id: c._id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    address: c.address,
    dob: c.dob,
    post: c.post,
    profileImage: c.profileImage,
    discordProfile: c.discordProfile,
    linkedinProfile: c.linkedinProfile,
    githubProfile: c.githubProfile,
    emergencyContactName: c.emergencyContactName,
    emergencyContactNumber: c.emergencyContactNumber,
    joinedDate: c.joinedDate,
    createdAt: c?.createdAt || null,
  }));
  return res.status(200).json(formattedData);
});

// Delete a single contact by ID
const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Contact ID is required",
    });
  }

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      data: {
        contactId: deletedContact._id,
        name: deletedContact.name,
        email: deletedContact.email,
      },
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

// Delete multiple contacts by IDs
const deleteContacts = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: "An array of contact IDs is required",
    });
  }

  try {
    const deleteResult = await Contact.deleteMany({ _id: { $in: ids } });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No contacts found with the provided IDs",
      });
    }

    return res.status(200).json({
      success: true,
      message: `${deleteResult.deletedCount} contact(s) deleted successfully`,
      data: {
        deletedCount: deleteResult.deletedCount,
      },
    });
  } catch (error) {
    console.error("Error deleting contacts:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

export {
  createContact,
  updateContact,
  getContacts,
  deleteContact,
  deleteContacts,
};
