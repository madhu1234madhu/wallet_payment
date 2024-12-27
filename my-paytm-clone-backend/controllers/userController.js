const User = require('../models/userModel');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

function generateUPI() {
    return crypto.randomBytes(16).toString('hex') + '@upi';
}


exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;

  
    const upi_id = generateUPI();

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        upi_id,
        balance: 1000
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', upi_id: newUser.upi_id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ message: 'Login successful', upi_id: user.upi_id,token });
};