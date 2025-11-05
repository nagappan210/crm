import { type RequestHandler } from "express";
import { TokenClass } from "./Authentication.ts";

const tokenHelper = new TokenClass();

export const authVerify = (requiredRoles: string[] = []): RequestHandler => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ success: false, message: "Token missing" });
      }

      const decoded: any = await tokenHelper.tokenValidator(token);

      // Role check - Check if user's role is in the requiredRoles array
      if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.roll)) {
        return res
          .status(403)
          .json({ 
            success: false, 
            message: "Access denied: insufficient permissions",
            required: requiredRoles,
            current: decoded.roll
          });
      }

      (req as any).user = decoded;
      next();
    } catch (error: any) {
      console.error("Token validation failed:", error);
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token" });
    }
  };
};