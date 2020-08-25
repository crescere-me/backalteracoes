const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mailer = require('../../modules/mailer')
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const User = require('../models/user');
const { isContext } = require('vm');
const { restart } = require('nodemon');

class UserController {
  // POST - CRIAR USUARIO
  async store(req, res) {
    const user = await userModel.create(req.body);

    user.pass = undefined;

    return res.status(201).json({ user });
  }

  // DELETE - DELETAR USUARIO
  async destroy(req, res) {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: 'Usuário deletado com sucesso' });
  }

  // PUT - ATUALIZAR USUARIO
  async update(req, res) {
    const { id } = req.params;

    delete req.body.pass;

    const user = await userModel.findOneAndUpdate(id, req.body, {
      new: true,
    });

    user.pass = undefined;

    return res.json({ user });
  }

  // Encontrar um usuario
  async show(req, res) {
    const { id } = req.params;

    const user = await userModel.findById(id);
    return res.status(200).json({ user });
  }

  // GET com TODOS USUARIOS
  async index(req, res) {
    const users = await userModel.find();
    return res.status(200).json({ users });
  }

  //LOGIN
  async auth(req, res) {
    const { cpf, pass } = req.body;
    const user = await userModel.findOne({ cpf });
    console.log(user);
    if (!user) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }
    if (!(await bcrypt.compare(pass, user.pass))) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    /*const { _id: id } = user;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
     expiresIn: '1d',
   });*/
    return res.status(200).json({ user });
}

  //ESQUECI MINHA SENHA
  async forgot(req, res){
    const { email } = req.body;

    try {
      const user = await User.findOne({ email })

      if (!user)
        return res.status(400).json({error: "User not found"});
    
    const pass = crypto.randomBytes(8).toString('hex');
    user.pass = pass;
    await user.save();

    mailer.sendMail({
      to: email,
      from: "felipec.barroso@hotmail.com",
      template: '../../resources/mail/auth/forgot_password',
      context: { pass }
    }, (err) => {
      if (err)
      return res.status(400).json({error: "Cannot send forgot password email"});
      console.log(err);
      return res.json();
    })
    } catch (error) {
      res.status(400).json({error: 'Error on forgot password'})
      console.log(error);
    }
  }

  //RESET PASSWORD
  async reset(req, res){
    const { email, newPass, reNewPass } = req.body;

    try {
      const user = await User.findOne({ email })

        if (!user)
          return res.status(400).json({error: "User not found"})

        if (newPass !== reNewPass)
          return res.status(400).json({error: "As senhas nao coincidem"})
      
      user.pass = newPass;
      await user.save();
      res.status(200).json({ msg:"Dados atualizados" });
    

    } catch (error) {
      res.status(400).json({error: 'Canot reset password'});
    }
  }
}
module.exports = new UserController();
