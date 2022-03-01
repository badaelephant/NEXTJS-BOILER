const { verify } = require("../lib/jwt");
const checkAuth = (req, res, next) => {
  if (req.path.startsWith("/users")) {
    next();
  } else {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split("Bearer ")[1];
      const result = verify(token);
      if (result.success) {
        req.email = result.email;
        req.role = result.role;
        next();
      } else {
        res.status(401).send({
          success: false,
          message: result.message,
        });
      }
    }
  }
};
module.exports = checkAuth;
