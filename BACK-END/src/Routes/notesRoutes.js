import { Router } from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNotesById,
} from "../controllers/notesController.js";

const router = Router();

router.get("/", getAllNotes);
router.get("/:id", getNotesById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
