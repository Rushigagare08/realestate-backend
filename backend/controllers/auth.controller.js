import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

/**
 * SIGN UP
 */
export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * SIGN IN
 */
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser)
      return next(errorHandler(404, "User not found"));

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(400, "Wrong email or password"));

    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET_KEY
    );

    const { password: _, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);

  } catch (error) {
    next(error);
  }
};




/**
 * GOOGLE AUTH
 */
export const googleAuth = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      const token = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET_KEY
      );

      const { password: _, ...rest } = existingUser._doc;

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }

    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

    const usernameBase = req.body.name.split(" ").join("").toLowerCase();
    const randomSuffix = Math.floor(Math.random() * 10000);

    const newUser = new User({
      userName: usernameBase + randomSuffix,
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photoUrl,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY
    );

    const { password: _, ...restUser } = newUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(restUser);
  } catch (error) {
    next(error);
  }
};

/**
 * SIGN OUT
 */
export const signOut = (req, res,next) => {

  try {
    res.clearCookie("access_token")
    res.status(200).json({ message: "User logged out successfully" })
    
    
  } catch (error) {
    next(error)
    
  }
    

};
