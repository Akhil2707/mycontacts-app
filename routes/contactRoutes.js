const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactControllers");

router.route("/").get(getContacts);
router.route("/").post(createContact);
router.route("/:id").get(getContact);
router.route("/:id").delete(deleteContact);
router.route("/:id").put(updateContact);

module.exports = router;
