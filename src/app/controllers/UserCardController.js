const userCardModel = require('../models/userCard');

class UserCardController {
  //salvar os cartoes de 1 usuário
  async store(req, res) {
    const userCard = await userCardModel.create(req.body);
    return res.status(201).json({ userCard });
  }
  // GET - Listar todos os cartões de um usuario
  async index(req, res) {
    const { _id: id } = req.params; // Puxa da URL o id do cliente
    const findCards = await userCardModel.find({ UserID: id });
    res.status(200).json({ findCards });
  }

  //Deletar um cartão
  async destroy(req, res) {
    const { id } = req.params;
    await userCardModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: 'Cartao deletado com sucesso' });
  }
  }


module.exports = new UserCardController();
