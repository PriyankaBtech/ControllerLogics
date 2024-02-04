// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');


// Controller for signup user
exports.registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    
    } catch (error) {
        res.status(400).json({ message: error.message });        
    }
}


// Controller for login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
        }
        // might generate and send a JWT token for authentication
        res.json({ message: 'Login successful' });

    } catch (error) {
        res.status(400).json({ message: error.message });        
    }

}