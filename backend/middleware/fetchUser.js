const jwt = require("jsonwebtoken")

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Invalid authorization" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({ error: "Invalid authorization" });
    }
};

module.exports = fetchUser