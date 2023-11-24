import jwt from "jsonwebtoken";
import { userModel } from "../../DB/models/User.model.js";

export const roles = {
  Admin: "Admin",
  User: "User",
  Hr: "HR",
};
export const auth = (accessRoles = []) => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization?.startsWith(process.env.BERERKEY)) {
        res.status(400).json({ message: "in-valid bearer key" });
      } else {
        const token = authorization.split(process.env.BERERKEY)[1];
        const decoded = jwt.verify(token, process.env.SIGNINTOKEN);
        if (!decoded?.id || !decoded?.isLoggedIn) {
          res.status(400).json({ message: "in-valid token payload" });
        } else {
          const user = await userModel
            .findById(decoded?.id)
            .select("userName email profilePic role");
          if (!user) {
            res.status(401).json({ message: "not register user" }); // not login user
          } else {
            console.log(accessRoles);
            console.log(accessRoles.includes(user.role));
            if (!accessRoles.includes(user.role)) {
              res.status(403).json({ message: "Un-authorized User" }); // not login user
            } else {
              req.user = user;
              next();
            }
          }
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Catch error", error });
    }
  };
};
