const mongoose = require('../../config/db');

const transactionSchema = mongoose.Schema(
  {
    usercardID: { // id do usuario cartão
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    establishment: {
      type: String,
    },
    value: {
      type: Number,
      required: true,
    },
    // isDebit: {
    //   type: Number,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

transactionSchema.pre('save', async function (next) {
  if (this.isDebit === 0) {
    this.value *= -1;
    next();
  } // Quando for operação de débito já é salvo automaticamente no banco de dados o valor negativo
  const myDate = new Date();
  this.date = `${myDate.getDate()}/${
    myDate.getMonth() + 1
  }/${myDate.getFullYear()}`; 
});

const transaction = mongoose.model('transaction', transactionSchema);
module.exports = transaction;
