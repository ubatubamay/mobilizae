const User = require('../models/users');
const userCtrl = {};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

userCtrl.createUser = async (req, res) => {
    const user = new User({
        email: req.body.email,
        password:req.body.password,
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_nascimento: req.body.dataNasc,
        slogan: req.body.slogan,
        governo: req.body.governo,
        nivelEducacional: req.body.nivel,
        slogan: req.body.slogan,
        endereco: {
            logradouro: req.body.logradouro, 
            numero: req.body.numero, 
            bairro: req.body.bairro, 
            cidade: req.body.cidade, 
            uf: req.body.uf
        },
        governo: req.body.governo,
        nivelEducacional: req.body.nivel,
        descricao: req.body.descricao,
    });
    user.save((err, registeredUser) => {
        if(err) {
            console.log(err);
        }else{
            let payload = {subject: registeredUser._id};
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
        }
    });
    res.json({
        'status': 'User saved' 
    });
}

userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

userCtrl.editUser = async (req, res) => {
    const { id } =  req.params;
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    await User.findByIdAndUpdate(id, {$set: user}, {new: true});
    res.json({status: 'User Updated'});
}

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'User deleted'});
}

userCtrl.registerUser = (req, res) => {
    var saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        var user = {
            role: req.body.role,
            email: req.body.email,
            password:hash,
            name: req.body.nome,
            cpf: req.body.cpf,
            data_nascimento: req.body.dataNasc,
            slogan: req.body.slogan,
            governo: req.body.governo,
            nivelEducacional: req.body.nivel,
            slogan: req.body.slogan,
            endereco: {
                logradouro: req.body.logradouro, 
                numero: req.body.numero, 
                bairro: req.body.bairro, 
                cidade: req.body.cidade, 
                uf: req.body.uf
            },
            governo: req.body.governo,
            nivelEducacional: req.body.nivel,
            descricao: req.body.descricao,
        };
        console.log(user);
        user = new User(user);
        user.save((err, registred) => {
            if(err) return console.log(err);
            console.log(registred);
            var token = jwt.sign({
                email: user.email,
                password: user.password
            }, 'secretKey');
            res.send({userEmail: user.email, pass: user.password, token: token});
            res.end();
        }); 
    });
}

module.exports = userCtrl;