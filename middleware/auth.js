const jwt = require("jsonwebtoken");

const auth_jwt = (req, res, next) => {
    const token = req.header("JWT");
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) res.status(403).json("Token not valid.");
            req.user = user;
            console.log(user);
            next();
        });
    } else{
        return res.status(401).json("No authentication.");
    }
    
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