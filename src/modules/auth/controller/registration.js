import { userModel } from "../../../../DB/models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../services/email.js";

export const signUp = async (req, res, next) => {
  try {
    const { email, userName, password } = req.body;
    const user = await userModel.findOne({ email }).select("email");
    if (user) {
      res.status(409).json({ message: "E-mail already exists" });
    } else {
      const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
      const newUser = new userModel({ email, password: hash, userName });
      const token = jwt.sign({ id: newUser._id }, process.env.EMAILTOKEN, {
        expiresIn: "1h",
      });
      const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmemail/${token}`;
      const message = `<a href = "${link}">Confirm Your E-mail</a>`;
      const info = await sendEmail(email, "Confirm Email", message);
      if (info?.accepted?.length) {
        const savedUser = await newUser.save();
        res.status(201).json({ message: "Done successfully" });
      } else {
        res.status(404).json({ message: "Email Rejected" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "CATCH ERROR", error });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.EMAILTOKEN);

    if (!decoded?.id) {
      res.status(400).json({ message: "In-Valid Payload" });
    } else {
      const user = await userModel.findOneAndUpdate(
        { _id: decoded.id, confirmEmail: false },
        { confirmEmail: true }
      );
      if (!user) {
        res.status(409).json({ message: "Already Confirmed" });
      } else {
        res.status(200).json({ message: "Confirmed" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "CATCH ERROR", error: error.message });
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("email");
    if (!user) {
      res.status(404).json({ message: "Not Registred E-mail please signup first" });
    } else {
      const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
      const newUser = new userModel({ email, password: hash, userName });
      const token = jwt.sign({ id: newUser._id }, process.env.EMAILTOKEN, {
        expiresIn: "1h",
      });
      const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmemail/${token}`;
      const message = `<a href = "${link}">Confirm Your E-mail</a>`;
      const info = await sendEmail(email, "Confirm Email", message);
      if (info?.accepted?.length) {
        const savedUser = await newUser.save();
        res.status(201).json({ message: "Done successfully" });
      } else {
        res.status(404).json({ message: "Email Rejected" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "CATCH ERROR", error });
  }
};
