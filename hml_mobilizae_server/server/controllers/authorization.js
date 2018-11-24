const jwt = require('jsonwebtoken');
const apiConfig = require('../config');

handleAuthorization = (req, res, next) => {
    const token = extractToken(req);
    if (!token){
        res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
        res.status(401).json({message: "Você precisa se autenticar."});
    }else{
        jwt.verify(token, apiConfig.secret, (err, decoded) => {
            if(decoded){
                next();
            }else{
                res.status(403).json({message: 'Não autorizado.'});
            }
        })
    }
}

function extractToken(req) {
    let token = undefined;
    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length == 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}

module.exports = handleAuthorization;
