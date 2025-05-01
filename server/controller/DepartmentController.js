// src/controllers/departmentController.js
import asyncHandler from "express-async-handler";
import Department from "../models/department.js";
import Employee from "../models/employee.js"; // Make sure this is correctly imported

// Create a new department
const createDepartment = asyncHandler(async (req, res) => {
  const { name, description, head } = req.body;

  if (!name || !head) {
    return res.status(400).json({
      success: false,
      message: "Name and head are required fields!",
    });
  }

  try {
    const newDepartment = await Department.create({
      name,
      description,
      head,
    });

    return res.status(201).json({
      success: true,
      message: "Department created successfully!",
      data: {
        id: newDepartment._id,
        name: newDepartment.name,
        description: newDepartment.description,
        head: newDepartment.head,
        createdAt: newDepartment.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating department:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

// Update a department by ID
const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, head } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Department ID is required",
    });
  }

  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { name, description, head },
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: {
        id: updatedDepartment._id,
        name: updatedDepartment.name,
        description: updatedDepartment.description,
        head: updatedDepartment.head,
        updatedAt: updatedDepartment.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating department:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

// 🔥 UPDATED: Get all departments with employee count
const getDepartments = asyncHandler(async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });

    const enrichedDepartments = await Promise.all(
      departments.map(async (dept) => {
        const employeeCount = await Employee.countDocuments({ department: dept._id });

        return {
          id: dept._id,
          name: dept.name,
          description: dept.description,
          head: dept.head,
          employeeCount,
          createdAt: dept.createdAt,
          updatedAt: dept.updatedAt,
        };
      })
    );

    return res.status(200).json(enrichedDepartments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

// Delete a department by ID
const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Department ID is required",
    });
  }

  try {
    const deleted = await Department.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
      data: {
        departmentId: deleted._id,
        name: deleted.name,
      },
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});

export { createDepartment, updateDepartment, getDepartments, deleteDepartment };
