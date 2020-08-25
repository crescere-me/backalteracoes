const yup = require('yup');

class Validators {
  async userCreateValidator(req, res, next) {
    const userMask = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      pass: yup.string().required(),
      cpf: yup.string().required(),
    });

    const userValidate = await userMask.isValid(req.body, { strict: true });

    if (!userValidate) {
      return res.status(400).json({ msg: 'Dados incorretos.' });
    }
    next();
  }

  async userUpdateValidator(req, res, next) {
    const userMask = yup.object().shape({
      name: yup.string().required(),
        email: yup.string().required().email(),
        pass: yup.string().required(),
        cpf: yup.number().required(),
      });

    const userValidate = await userMask.isValid(req.body);

    if (!userValidate) {
      return res.status(400).json({ msg: 'Dados incorretos.' });
    }
    next();

   const validarCpf = require('validar-cpf');{
      cpf = cpf.replace(/[^\d]+/g,'');
      if(cpf == '') return res.status(400).json({ msg: 'CPF inválido' });
      // Elimina CPFs invalidos conhecidos
      if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return res.status(400).json({ msg: 'CPF inválido' });
      // Valida 1o digito
      add = 0;
      for (i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
          rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
        return res.status(400).json({ msg: 'CPF inválido' });
      // Valida 2o digito
      add = 0;
      for (i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(cpf.charAt(10)))
      return res.status(400).json({ msg: 'CPF inválido' });

    }
    next();
  }
}

module.exports = new Validators();
