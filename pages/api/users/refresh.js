import { sign, verify, refreshVerify } from "../../../lib/jwt";
import { connectToDatabase } from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
import { errorjson, successjson } from "../../../lib/return";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const cookies = req.headers.cookie;
  const { accessToken, refreshToken } = cookie.parse(cookies);
  if (accessToken && refreshToken) {
    // access token 검증 -> expired여야 함.
    const authResult = verify(accessToken);
    const decoded = jwt.decode(accessToken);
    if (decoded === null) return errorjson(res, "No authorized!");

    const refreshResult = refreshVerify(refreshToken, decoded.email);

    if (authResult.success === false && authResult.message === "jwt expired") {
      if (refreshResult.success === false) {
        return errorjson(res, "No authorized!");
      } else {
        let user = null;
        try {
          user = await db.collection("user").findOne({ email: decoded.email });
        } catch (error) {
          console.log(error);
        }
        const newAccessToken = sign(user);
        return successjson(res, {
          accessToken: newAccessToken,
          refreshToken,
        });
      }
    } else {
      return errorjson(res, "Acess token is not expired!");
    }
  } else {
    return errorjson(
      res,
      "Access token and refresh token are need for refresh!"
    );
  }
};
