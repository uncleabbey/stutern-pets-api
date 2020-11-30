const express = require("express");
const {
  deleteOwner,
  editOwner,
  getAllOwners,
  getOwner,
  registerOwner,
} = require("../controllers/owner");

const router = new express.Router();

router.route("").get(getAllOwners).post(registerOwner);
router.route("/:id").get(getOwner).patch(editOwner).delete(deleteOwner);

module.exports = router;
