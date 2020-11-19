const expressJwt = require('express-jwt');
const secret = require('../util/config').jwtKey;
const User = require('../models/user');

module.exports = authorize;

function authorize(roles = []) {

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret }),

        // authorize based on user role
        (req, res, next) => {

        User.findById(req.user.userId, function (err, user) {

            if (roles.length && !roles.includes(user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        })

        }
    ];
}
