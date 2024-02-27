const utilSecurity = require("../util/security")

module.exports = {
    checkJWT,
    checkLogin,
    checkPermission
};

function checkJWT(req, res, next) {
    // Check for the token being sent in a header or as a query parameter
    let token = req.get("Authorization") || req.query.token;
    if (token) {
        token = token.replace("Bearer ", "");
        req.user = utilSecurity.verifyJWT(token);
    } else {
      // No token was sent
      req.user = null;
    }
    return next();
};

// check if they are logged in
function checkLogin(req, res, next) {
    // Status code of 401 is Unauthorized
    if (!req.user) return res.status(401).json("Unauthorized User");
    // A okay
    next();
};

// check if they are owner or admin
function checkPermission(req, res, next) {
    // Status code of 401 is Unauthorized
    if (!req.user) return res.status(401).json("Unauthorized User");
    // if you are not the owner and you are not admin -> unauthorized
    if (req.body.email != req.user.email && req.user.is_admin == false) return res.status(401).json("Unauthorized owner/admin"); 
    next();
};