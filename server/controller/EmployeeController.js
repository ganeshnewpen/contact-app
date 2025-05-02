import asyncHandler from "express-async-handler";
import Employee from "../models/employee.js";
import mongoose from "mongoose";

// Create a new employee
const createEmployee = asyncHandler(async (req, res) => {
  
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
    departmentId,
  } = req.body;

  if (!name || !email || !phone || !address || !departmentId) {
    return res.status(400).json({
      success: false,
      message: "Name, email, phone, address and department are required!",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(departmentId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid department ID format",
    });
  }

  try {
    const newEmployee = await Employee.create({
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
      department: departmentId,
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully!",
      data: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

// Update a employee
const updateEmployee = asyncHandler(async (req, res) => {
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
    departmentId,
  } = req.body;

  if (!name || !email || !phone || !address || !departmentId) {
    return res.status(400).json({
      success: false,
      message: "Name, email, phone, address and deparment are required!",
    });
  }

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Employee ID is required",
    });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
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
        department: departmentId,
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      id: updatedEmployee._id,
      name: updatedEmployee.name,
      email: updatedEmployee.email,
      phone: updatedEmployee.phone,
      address: updatedEmployee.address,
      dob: updatedEmployee.dob,
      post: updatedEmployee.post,
      joinedDate: updatedEmployee.joinedDate,
      profileImage: updatedEmployee.profileImage,
      discordProfile: updatedEmployee.discordProfile,
      githubProfile: updatedEmployee.githubProfile,
      linkedinProfile: updatedEmployee.linkedinProfile,
      emergencyContactName: updatedEmployee.emergencyContactName,
      emergencyContactNumber: updatedEmployee.emergencyContactNumber,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find()
    .populate("department")
    .sort({ createdAt: -1 })
    .select({ __v: 0 });
  const formattedData = employees.map((c) => ({
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

// Delete a single employee by ID
const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Employee ID is required",
    });
  }

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: {
        employeeId: deletedEmployee._id,
        name: deletedEmployee.name,
        email: deletedEmployee.email,
      },
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

// Delete multiple employees by IDs
const deleteEmployees = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: "An array of employee IDs is required",
    });
  }

  try {
    const deleteResult = await Employee.deleteMany({ _id: { $in: ids } });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No employees found with the provided IDs",
      });
    }

    return res.status(200).json({
      success: true,
      message: `${deleteResult.deletedCount} employee(s) deleted successfully`,
      data: {
        deletedCount: deleteResult.deletedCount,
      },
    });
  } catch (error) {
    console.error("Error deleting employees:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

export {
  createEmployee,
  updateEmployee,
  getEmployees,
  deleteEmployee,
  deleteEmployees,
};
