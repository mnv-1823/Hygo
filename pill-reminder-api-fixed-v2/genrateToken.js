require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

app.post('/login', (req, res) => {
    // const user = { id: 1, username: "john_doe", email: "john@example.com" };

    const token = generateToken(user);

    res.cookie('token', token, {
        httpOnly: true,       // Prevent client-side JS access
        secure: process.env.NODE_ENV === 'production', // Use true in production (requires HTTPS)
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({ message: 'Login successful', user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
