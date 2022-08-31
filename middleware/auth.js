const jwt = require("jsonwebtoken");

const auth_jwt = (req, res, next) => {
    const token = req.body.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = decoded;
        } catch (err) {
            return res.status(401).json("Invalid Token.");
        }
        
    } else{
        return res.status(401).json("Token required for authentication.");
    }
    return next();
}

const auth_jwt_admin = (req, res, next) => {
    auth_jwt(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("No authorization.");
        }
    });
};

const auth_admin = (req, res, next) => {
    auth_jwt(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("No authorization.");
        }
    });
};

module.exports = {auth_jwt, auth_jwt_admin, auth_admin};