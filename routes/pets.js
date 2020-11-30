const express = require("express");
const {
  addPets,
  deletePet,
  editPet,
  getOwnersPet,
  getPet,
} = require("../controllers/pets");

const router = new express.Router();

router.route("/:ownerId/pets").get(getOwnersPet).post(addPets);
router
  .route("/:ownerId/pets/:petId")
  .get(getPet)
  .patch(editPet)
  .delete(deletePet);

module.exports = router;
