import express from "express";
const router = express.Router();

import {
  createContact,
  deleteContact,
  getContacts,
  updateContact
} from "../controller/ContactController.js";

router.post("/create-contact", createContact);
router.get("/all", getContacts);
router.delete("/delete/:id", deleteContact);
router.put("/:id", updateContact);


export default router;
