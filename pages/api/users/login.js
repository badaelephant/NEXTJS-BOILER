import { connectToDatabase } from "../../../lib/mongodb";
import { successjson, errorjson } from "../../../lib/return";
import bcryptjs from "bcryptjs";
import jwt from "../../../lib/jwt";
import redisClient from "../../../lib/redis";
export default async (req, res) => {
  const method = req.method;
  const { db } = await connectToDatabase();

  switch (method) {
    case "POST":
      const { email, password } = req.body;
      try {
        const user = await db.collection("user").findOne({ email });
        if (!user) return errorjson(res, "no user with email");
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) return errorjson(res, "password not match");
        const accessToken = jwt.sign(user);
        const refreshToken = jwt.refresh();

        redisClient.set(user.email, refreshToken);
        return successjson(res, { accessToken, refreshToken });
      } catch (error) {
        return errorjson(res, "error!");
      }
      break;

    default:
      break;
  }
};
