import { userModel } from "../../../../DB/models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../services/email.js";
import { asyncHandler } from "../../../services/errorHanding.js";
import { findOne, findOneAndUpdate } from "../../../../DB/DBMethods.js";

//SignUp Function
export const signUp = asyncHandler(async (req, res, next) => {
  const { email, userName, password } = req.body;
  // const user = await userModel.findOne({ email }).select("email");
  const user = await findOne({
    model: userModel,
    filter: { email },
    select: "email",
  });
  if (user) {
    next(Error("E-mail already Exist", { cause: 409 }));
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
      next(Error("E-mail Is Rejected", { cause: 400 }));
    }
  }
});

//Confirm E-mail Function
export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.EMAILTOKEN);

  if (!decoded?.id) {
    next(Error("In-Valid PayLoad", { cause: 400 }));
  } else {
    // const user = await userModel.findOneAndUpdate(
    //   { _id: decoded.id, confirmEmail: false },
    //   { confirmEmail: true }
    // );
    const user = await findOneAndUpdate({
      model: userModel,
      filter: { _id: decoded.id, confirmEmail: false },
      data: { confirmEmail: true },
    });
    if (!user) {
      next(Error("E-mail Is Already Confirmed", { cause: 409 }));
    } else {
      res.status(200).json({ message: "Confirmed" });
    }
  }
});

//SignIn Function
export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // const user = await userModel.findOne({ email });
  const user = await findOne({ model: userModel, filter: { email } });
  if (!user) {
    next(Error("Not Registred E-mail Please SignUp First", { cause: 404 }));
  } else {
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      next(Error("In-Valid Password", { cause: 400 }));
    } else {
      if (!user.confirmEmail) {
        next(Error("Please Confirm Your E-mail First", { cause: 400 }));
      } else {
        if (user.blocked) {
          next(
            Error("Your Account Is Blocked Contact With Us To Get More Info", {
              cause: 400,
            })
          );
        } else {
          const token = jwt.sign({ id: user._id }, process.env.SIGNINTOKEN, {
            expiresIn: 60 * 60 * 24,
          });
          res.status(200).json({ message: "Done Signing", token });
        }
      }
    }
  }
});
