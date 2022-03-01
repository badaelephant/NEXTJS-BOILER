import { sign, verify, refreshVerify } from "../../../lib/jwt";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.headers.authorization && req.headers.refresh) {
    const authToken = req.headers.authorization.split("Bearer ")[1];
    const refreshToken = req.headers.refresh;
    // access token 검증 -> expired여야 함.
    const authResult = verify(authToken);
    const decoded = jwt.decode(authToken);
    if (decoded === null) {
      res.status(401).send({
        success: false,
        message: "No authorized!",
      });
    }
    const refreshResult = refreshVerify(refreshToken, decoded.email);
    console.log(authResult.message);
    if (authResult.success === false && authResult.message === "jwt expired") {
      if (refreshResult.success === false) {
        res.status(401).send({
          success: false,
          message: "No authorized!",
        });
      } else {
        const newAccessToken = sign(user);
        res.status(200).send({
          // 새로 발급한 access token과 원래 있던 refresh token 모두 클라이언트에게 반환합니다.
          ok: true,
          data: {
            accessToken: newAccessToken,
            refreshToken,
          },
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Acess token is not expired!",
      });
    }
  } else {
    res.status(400).send({
      success: false,
      message: "Access token and refresh token are need for refresh!",
    });
  }
};
