const jwt = require('jsonwebtoken');
const secretKey = process.env.MY_SECRET_KEY

const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id,
            email: user.email,
        }
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
};

const authenticateToken = async (connection) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Access token not provided' });
        }
        jwt.verify(token, secretKey, async (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            try {
                const { userId } = decodedToken.user;
                const [studentRows, studentFields] = await connection.query('SELECT * FROM students WHERE id = ?', [userId]);
                const [teacherRows, teacherFields] = await connection.query('SELECT * FROM teachers WHERE id = ?', [userId]);
                
                if (studentRows.length > 0) {
                    req.user = {
                        id: userId,
                        isAdmin: false
                    };
                } else if (teacherRows.length > 0) {
                    req.user = {
                        id: userId,
                        isAdmin: true
                    };
                } else {
                    return res.status(404).json({ message: 'User not found' });
                }
                next();
            } catch (error) {
                console.error('Error authenticating token:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    };
};

module.exports = { authenticateToken, generateToken} ;