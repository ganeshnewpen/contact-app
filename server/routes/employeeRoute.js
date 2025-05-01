import express from "express";
const router = express.Router();

import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../controller/EmployeeController.js";

router.post("/create-employee", createEmployee);
router.get("/all", getEmployees);
router.delete("/delete/:id", deleteEmployee);
router.put("/:id", updateEmployee);

export default router;
