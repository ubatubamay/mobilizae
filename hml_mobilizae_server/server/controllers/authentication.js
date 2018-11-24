const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const apiConfig = require('../config');

handleAuthentication = (req, res) => {
    User.find({email: req.body.email})
        .exec().then(user => {
            if (user.length < 1){
                return res.status(401).json({
                    message: "Usuário não encontrado."
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message: "Não autenticado."
                    });
                }
                if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                        iss: 'mobilizae-api'
                        },
                            apiConfig.secret,
                            {
                                expiresIn: "1h"
                            }
                    );
                    return res.status(200).json({
                        message: "Autenticado com sucesso.",                        
                        name: user[0].name,
                        email: user[0].email,
                        token: token
                    });
                }
                return res.status(401).send("Senha icorreta.");                
            });
        });
}

module.exports = handleAuthentication;
