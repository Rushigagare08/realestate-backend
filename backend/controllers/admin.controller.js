import User from "../models/user.js";
import Listing from "../models/listing.js";
import { errorHandler } from "../utils/error.js";

/**
 * GET ALL USERS (ADMIN)
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL LISTINGS (ADMIN)
 */
export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE USER (ADMIN)
 */
export const deleteUserByAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE LISTING (ADMIN)
 */
export const deleteListingByAdmin = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found"));

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing deleted successfully");
  } catch (error) {
    next(error);
  }
};
