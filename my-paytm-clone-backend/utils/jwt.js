const jwt = require('jsonwebtoken'); 
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };