const User = require('../models/user');
const bcrypt = require('bcryptjs');


// Controller for user registration
exports.userRegistration = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Hash the password before saving it to the database
        const hashedPassword = await User.bcrypt.hash(password, 10);
        // Create a new user instance with hashed password
        const user = new User({ username, email, password: hashedPassword });
        await res.user.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });        
    }
}

/**
NOTE : When creating a new instance of a model with Mongoose, 
       - you don't need to use await because the new keyword doesn't perform any asynchronous operation by itself.
       - await keyword is used when you awaiting an asynchronous operation. 
*/


// Controller for user login
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({message: "User not found"});        
        }
        // Check if the provided password matches the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
        }
        res.json({ message: 'Login successful' });

    } catch (error) {
        res.status(400).json({ message: error.message });        
    }        
}
