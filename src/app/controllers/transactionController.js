const transactionModel = require('../models/transaction');
const {value} = require('../models/transaction');
const {limit, balance} = require('../models/card');

class transactionController {
  // post - Criar Transação
  async store(req, res) {
    const transaction = await transactionModel.create(req.body);
    console.log(limit);
    console.log(value);
    if (limit < value)
    return res.status(201).json({ erro: "Saldo insuficiente" });
  }
  // GET - Listar todas as transações
  async index(req, res) {
    const transactions = await transactionModel.find();
    return res.json(transactions);
  }
}

module.exports = new transactionController();
