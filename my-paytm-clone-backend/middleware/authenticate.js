const { verifyToken } = require('../utils/jwt');  // Assuming you have a JWT utility to verify tokens

const authenticate = (req, res, next) => {
    // Get the token from the authorization header
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token and decode the user info
        const decoded = verifyToken(token);
        req.userId = decoded.userId;  // Attach userId to the request object
        next();  // Proceed to the next middleware/route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
