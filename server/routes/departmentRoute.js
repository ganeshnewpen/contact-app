import express from "express";
const router = express.Router();

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controller/DepartmentController.js";

router.get("/", getDepartments);
router.post("/create", createDepartment);
router.put("/update/:id", updateDepartment);
router.delete("/delete/:id", deleteDepartment);

export default router;
