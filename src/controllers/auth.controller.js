const authService = require('../services/auth.service')

const signupHandler = (req, res) => {
    const { name ,email, password } = req.body;
    const newUser = authService.signup(name,email,password)
    if (newUser) {
        res.status(201).json({ newUser });
    } else {
        res.status(409).json({ message: 'Registration Unsuccessful' });
    }
};

const loginHandler = (req, res) => {
    const { email, password } = req.body;
    // const user = authService.login(email, password);
    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { loginHandler, signupHandler };