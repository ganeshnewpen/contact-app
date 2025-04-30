
import Department from "../models/Department";

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('employees');
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDepartment = async (req, res) => {
  const { name, description, head } = req.body;
  
  try {
    const department = new Department({ name, description, head });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  
  try {
    const department = await Department.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  
  try {
    await Department.findByIdAndDelete(id);
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export {
  getAllDepartments,
};
