import { connectToDatabase } from "../../../lib/mongodb";
import { successjson, errorjson } from "../../../lib/return";
import bcryptjs from "bcryptjs";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const method = req.method;

  switch (method) {
    case "POST":
      try {
        const { email, role, password } = req.body;
        const user = await db.collection("user").findOne({ email });
        if (user) return errorjson(res, "user already exist");

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);
        const newUser = await db
          .collection("user")
          .insertOne({ email, role, password: hash });
        return successjson(res, newUser);
      } catch (error) {
        return errorjson(res, "error!");
      }
  }
};
