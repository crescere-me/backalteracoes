const mongoose = require('../../config/db');

const cardSchema = mongoose.Schema(
  {
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },    
    Number: { // numero do cartão
      type: String,
    },
    limit: {//limite do cartão
      type: Number,
      required: true,
    },
    // balance:{//Saldo
    //   type: Number,
    //   required: true,
    // },
    cardExpire: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

cardSchema.pre('save', async function (next) {
  function CardNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  } // Função que cria aletoriamente os 4 ultimos digitos do cartão
  this.Number = `${CardNumber(1000, 10000)}`; // Atruição do resultado da função ao cardNumer
  next();
  const myDate = new Date();
  this.cardExpire = `${myDate.getMonth() + 1}/${myDate.getFullYear() + 5}`; // Gambiarra provisória de exemplo de manipulação dasdatas de foma automática
});

const card = mongoose.model('card', cardSchema);
module.exports = card;
/**
 * Cadastro de cartões para os usuários
 * 
 */