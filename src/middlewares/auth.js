const jwt = require("jsonwebtoken");
const secretKey = "mysecretkey";

const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

const authorizeTeacher = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Admin access required" });
};

module.exports = { generateToken, authorizeTeacher, verifyToken };
