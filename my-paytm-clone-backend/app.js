// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load .env file for sensitive data
const userRoutes = require('./routes/userRoutes'); // Import user routes
const transactionRoutes = require('./routes/transactionRoutes'); // Import transaction routes
const rateLimit = require('express-rate-limit');

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON data from incoming requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL encoded data

// MongoDB connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log('Database connection failed:', err));

    const limiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour window
        max: 100, // limit to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later.'
    });
    
    app.use(limiter);

// Use Routes
app.use('/api/users', userRoutes); // Register the user routes
app.use('/api/transactions', transactionRoutes); // Register the transaction routes

// Set the port for the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
