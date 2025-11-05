import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export class TokenClass {
  async tokenGeneration(userName: string, roll: string): Promise<any> {
    try {
      const ramdomNumber = Math.floor(10000 + Math.random() * 90000).toString();
      const secret = process.env.SIGNATURE;
      if (!secret) {
        throw new Error("JWT secrete Key is not Defined in the ENV file");
      }
      const token = await jwt.sign(
        {
          userName,
          roll,
          ramdomNumber,
        },
        secret
      );
      return token;
    } catch (error) {
      return console.log("error", error);
    }
  }

  async Bcrypt(password: string):Promise<string>{
    try {
      const hased = await bcrypt.hash(password, 10);
      return hased;
    } catch (error:any) {
      console.log("error", error);
      return error;
    }
  }
  async BcryptCompare(password: string, newPassword: string): Promise<any> {
    try {
      const val = bcrypt.compare(password, newPassword);
      return val;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }

  async tokenValidator(token: string) {
    try {
      const secret = process.env.SIGNATURE;
      if (!secret) {
        throw new Error("JWT secrete Key is not Defined in the ENV file");
      }

      const verify = await jwt.verify(token, secret);
      return verify;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }
 
}
