import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validation
    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ error: "Phone number is required" });
    }
    if (!address) {
      return res.status(400).send({ error: "Address is required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });

    // If user already exists
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    // Save the user
    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send({
      message: "Error in registration",
      error,
    });
  }
};
