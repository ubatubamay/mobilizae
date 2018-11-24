const User = require('../models/user');

/**
 * Lista todos usuários
 * restrição: 'admin'
 */
exports.index = async (req, res) => {
  await User.find({}, '-salt -password', (err, resolve) => {
      if (err)
          return res.sendStatus(401).json({ message: "Erro ao listar usuários"});
      if (resolve)
          return res.json(resolve);
  });
};

exports.logout = async (req, res) => {
    req.logout();
    res.send('Usuário desconectado');
};

/**
 * Cria um novo usuário
 */
exports.singUp = async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;
  User.findOne({email: email}, function (errFind, doc) {
    if (errFind) return res.sendStatus(500).send('Erro ao buscar usuário')
    if (doc) return res.sendStatus(500).send('O e-mail informado já está em uso. '+doc.email)
    var newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = newUser.hashPassword(password);
    newUser.provider = 'local';
    newUser.role = role;
    newUser.save(function (errSave, user) {
      if (errSave){
        res.sendStatus(400).json({ message: "Erro ao cadastrar usuário"});
        console.log(errSave);
      }
      if (user){
          res.json({ message: "Usuário cadastrado"});
      }
    });
  });
};

/**
 * Lista único usuário específico
 */
exports.show = async (req, res) => {
  var userId = req.params.id;
  await User.findById(userId, (err, user) => {
      if(err) res.sendStatus(400).json({ message: "Erro ao buscar usuário"});
      if (user) return res.json(user);
  });
};

/**
 * Mostra para o usuário o seu próprio perfil
 */
exports.me = async (req, res) => {
  var userId = req.params.id;
  await User.findOne({ _id: userId }, 'email', (err, user) => {
    if(err) res.sendStatus(401).json({ message: "Erro ao buscar usuário"});
    if(user) return res.json(user);
  });
};

/**
 * Deleta um usuário específico
 * restrição: 'admin'
 */
exports.destroy = async (req, res) => {
  await User.findByIdAndRemove(req.params.id, (err, resolve) => {
    if(err) res.sendStatus(400).json({ message: "Erro ao buscar usuário"});
    if(resolve){
        return res.json({ message: "Usuário deletado"});
    }
  });
}

/**
 * Muda a senha de um usuário
 */
exports.changePassword = async (req, res) => {
  var userId = req.params.id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  await User.findById(userId, (err, user) => {
    if(err) res.sendStatus(400).json({ message: "Erro ao buscar usuário"});
    if (user){
        var valid = user.comparePassword(oldPass, user.password)
        if (valid) {
            user.password = user.hashPassword(newPass);
            return user.save((errSave, resolve) => {
                if(errSave) res.sendStatus(400).json({ message: "Erro ao atualizar senha"});
                if (resolve) return res.json({ message: "Senha alterada"});
            });
        } else return res.sendStatus(403).json({ message: "A senha antiga informada não é válida."});
    }
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
