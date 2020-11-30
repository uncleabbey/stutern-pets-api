const { Owner } = require("../models");

const registerOwner = async (req, res, next) => {
  const { name } = req.body;
  try {
    const owner = new Owner({ name });
    await owner.save();
    return res.status(201).json({
      message: "Owner added successfully",
      owner,
    });
  } catch (error) {
    next({
      status: 500,
      error,
    });
  }
};

const editOwner = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const owner = await Owner.findByIdAndUpdate({ _id: id }, { name });
    await owner.save()
    return res.status(200).json({
      message: "Owner updated succesfully",
      owner,
    });
  } catch (error) {
    next({
      status: 500,
      error,
    });
  }
};

const deleteOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      message: "Owner deleted succesfully",
    });
  } catch (error) {
    next({
      status: 500,
      error,
    });
  }
};

const getAllOwners = async (req, res, next) => {
  try {
    const owners = await Owner.find({});
    return res.status(200).json({
      message: "Succesfully retrieved owners",
      owners,
    });
  } catch (error) {
    next({
      status: 500,
      error,
    });
  }
};
const getOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const owner = await Owner.findById({ _id: id });
    if (owner) {
      return res.status(200).json({
        message: "Succesfully retrieved owners",
        owner,
      });
    }
    return next({
      status: 404,
      error: "owner does not exist",
    });
  } catch (error) {
    next({
      status: 500,
      error,
    });
  }
};
module.exports = {
  registerOwner,
  getAllOwners,
  getOwner,
  editOwner,
  deleteOwner,
};
