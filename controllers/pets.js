const { Pet, Owner } = require("../models");

const addPets = async (req, res, next) => {
  try {
    const { name } = req.body;
    const pet = new Pet({ name });
    const { ownerId } = req.params;
    pet.owner = ownerId;
    await pet.save();
    const owner = await Owner.findByIdAndUpdate(
      { _id: ownerId },
      { $addToSet:{pets: pet._id} }
    );

    return res.status(201).json({
      message: "Pet added successfully",
      owner: owner.populate("pets"),
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};
const getOwnersPet = async (req, res, next) => {
  try {
    const { ownerId } = req.params;
    const owner = await Owner.findById(ownerId).populate("pets").exec();
    if (owner) {
      return res.status(200).json({
        message: "pets owners retrieved succesfully",
        owner,
      });
    }
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

const getPet = async (req, res, next) => {
  try {
    const { ownerId, petId } = req.params;
    const pet = await Pet.findOne({ owner: ownerId, _id: petId });
    if (pet) {
      return res.status(200).json({
        message: "pet retrieved successfully",
        pet: pet.populate("owner"),
      });
    }
    return next({
      status: 404,
      error: "Pet not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

const editPet = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { ownerId, petId } = req.params;
    const pet = await Pet.findOneAndUpdate(
      { owner: ownerId, _id: petId },
      { name }
    );
    if (pet) {
      return res.status(200).json({
        message: "pet updated successfully",
        pet: pet.populate("owner"),
      });
    }
    return next({
      status: 404,
      error: "Pet not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

const deletePet = async (req, res, next) => {
  try {
    const { ownerId, petId } = req.params;
    const pet = await Pet.findOneAndDelete({ owner: ownerId, _id: petId });
    if (pet) {
      return res.status(200).json({
        message: "pet deleted successfully",
      });
    }
    return next({
      status: 404,
      error: "Pet not found",
    });
  } catch (error) {
    return next({
      status: 500,
      error,
    });
  }
};

module.exports = {
  addPets,
  deletePet,
  editPet,
  getOwnersPet,
  getPet,
};
