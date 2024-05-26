const authService = require("../services/auth.service");

const signupHandler = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const newUser = await authService.signup(name, email, password, isAdmin);
  if (newUser) {
    res.status(201).json({
      newUser: newUser,
      message: "Signed up successfully",
    });
  } else {
    res.status(409).json({ message: "Registration Unsuccessful" });
  }
};

const loginHandler = (req, res) => {
  const { email, password, isAdmin } = req.body;
  const user = authService.login(email, password, isAdmin);
  if (user) {
    res.status(200).json({
      user: user,
      message: "Logged in successfully",
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = { loginHandler, signupHandler };
