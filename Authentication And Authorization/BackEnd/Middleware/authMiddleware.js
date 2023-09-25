const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const Token = req.headers["authorization" ];
    if (!Token) {
      return res.status(401).json({success:false, msg: "No token provided" });
    }

    const token = Token.split(" ")[1];
    const verifyToken = jwt.verify(token, "SecretKey");

    if (verifyToken) {
      req.user = verifyToken.token;
      next();
    } else {
      return res.status(403).json({ success:false ,msg: "Unauthorized user!!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = authMiddleware;
