const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get Contact
//@route Get /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Post contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contacts = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contacts);
});

//@desc Get contact by id
//@route GET /api/contacts/{id}
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("contact not found ");
  }
  res.status(200).json(contacts);
});

//@desc Update contact
//@route PUT /api/contacts/{id}
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("No contact found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route Delete /api/contacts/{id}
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("contact not found");
  }
  await Contact.remove();
  res.status(200).json(contacts);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
