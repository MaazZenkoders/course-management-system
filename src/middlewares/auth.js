const jwt = require("jsonwebtoken");
const secretKey = process.env.MY_SECRET_KEY;

const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
    },
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const authorizeTeacher = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return res
        .status(403)
        .json({ message: "Only teachers can create courses" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { generateToken, authorizeTeacher };
