import express from "express";
const router = express.Router();

import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controller/departmentController.js";

router.get("/all", getAllDepartments);
router.post("/create", createDepartment);
router.put("/update/:id", updateDepartment);
router.delete("/delete/:id", deleteDepartment);

export default router;
