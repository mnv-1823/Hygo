const jwt = require("jsonwebtoken");

const extractToken = (req) => {
    return req.cookies?.token || req.header("Authorization")?.split(" ")[1];
};

module.exports = (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(403).json({ message: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
