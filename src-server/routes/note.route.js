const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notes.controller");

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote)
  .put(notesController.updateNote)
  .delete(notesController.deleteNote);

module.exports = router;
