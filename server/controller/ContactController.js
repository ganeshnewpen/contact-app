import asyncHandler from "express-async-handler";
import Contact from "../models/contact.js";

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, address, post, profileImage } = req.body;
  if ((!name, !email, !phone, !address)) {
    return res.status(400).json({
      success: false,
      message: "All fields are required! / Invalid request",
    });
  }

  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      address,
      post,
      profileImage,
    });

    return res.status(201).json({
      success: true,
      message: "Contact info created/saved successfully!",
      data: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        phone: newContact.phone,
        address: newContact.address,
        post: newContact.post,
        profileImage: newContact.profileImage,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Somting went wrong!!/ Server error!",
    });
  }
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()
    .sort({ createdAt: -1 })
    .select({ __v: 0 });
  const formattedData = contacts.map((c) => {
    return {
      id: c._id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      address: c.address,
      post: c.post,
      profileImage: c.profileImage,
      createdAt: c?.createdAt || null,
    };
  });
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
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Server error",
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
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Server error",
    });
  }
});

export { createContact, getContacts, deleteContact, deleteContacts };
