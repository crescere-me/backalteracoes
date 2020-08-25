const mongoose = require('../../config/db');
const bcrypt = require('bcryptjs');
const { string } = require('yup');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          pass: {
            type: String,
            required: true,
          },
          // cellNumber: {
          //   type: Number,
          //   require: true,
          // },
          // cardNumber: {
          //     type: Number,
          //     require: true,
          // },
          cpf: {
             type: String,
           require: true,
           },
          accountNumber: {
            type: String,
            required: false,
          },
          // passwordResetToken: {
          //   type: String,
          //   select: false,
          // },
          // passwordResetExpires: {
          //   type: Date,
          //   select: false,
          // },
        },
        {
          timestamps: true,
        }
);
UserSchema.pre('save', async function (next) {
    const hashPass = await bcrypt.hash(this.pass, 10);
    this.pass = hashPass;
    next();
  });

UserSchema.pre('save', async function (next) {
    function accNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    } // Função que gera o numero aleatório para a conta bancária
    this.accountNumber = `000${accNumber(1, 10000)}`; // Atribui o resultado da função ao accountNumber
    next();
  });

const User = mongoose.model('User', UserSchema);
module.exports = User;
