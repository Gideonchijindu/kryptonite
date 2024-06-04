import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { UnAuthorizedError } from "../lib/appError.js";
import userModel from "../models/userModel.js";

export const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new UnAuthorizedError("Missing token");

    const token = authorization.replace("Bearer ", "");

    const decoded = jwt.verify(token, env.jwt_key);
    if (!decoded)
      throw new UnAuthorizedError("Invalid token, user is not authorized");

    const user = await userModel.findById(decoded._id);

    if (!user) throw new UnAuthorizedError("User is not authorized");

    // Check if decoded token matches user token
    if (decoded.token !== user.token) {
      throw new UnAuthorizedError(
        "Invalid token, user is not authorized login again"
      );
    }

    if (user.acctstatus === "suspended")
      throw new UnAuthorizedError("Account suspended");

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    console.log(err);
    throw new UnAuthorizedError(err.message || "User is not authorized");
  }
};

export const dbconnection = (req, res, next) => {
  req.dbConnection = secondDb;

  next();
};

export const check = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    
    if (!authorization) {
      // No authorization header, continue without setting user
      return next();
    }

    const token = authorization.replace("Bearer ", "");

    const decoded = jwt.verify(token, env.jwt_key);
    if (!decoded) {
      // Invalid token, continue without setting user
      return next();
    }

    const user = await userModel.findById(decoded._id);

    if (!user) {
      // User not found, continue without setting user
      return next();
    }

    // Check if decoded token matches user token
    if (decoded.token !== user.token) {
      // Token mismatch, continue without setting user
      return next();
    }

    if (user.acctstatus === "suspended") {
      // Account suspended, continue without setting user
      return next();
    }

    // If all checks pass, attach user and token to request object
    req.user = user;
    req.token = token;
  } catch (err) {
    console.log(err);
    // Log the error but continue without setting user
  }

  // Proceed to the next middleware or route handler
  next();
};