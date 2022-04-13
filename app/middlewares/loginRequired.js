const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;
const { Unauthorized } = require('../config/errors');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Unauthorized();
  }

  const [, token] = authorization.split(' '); // Vai vir: "Bearer(espaço)Token".  por isso o split no token

  try {
    const data = jwt.verify(token, process.env.SECRET_TOKEN); // Dados que estão no payload do token
    const { id, email } = data; // Extraindo id e email que vieram no payload

    // Verificando se é o mesmo usuário (caso tenha atualizado o email, o token não será mais válido)
    const user = await User.findOne({ where: { id, email, },});

    if (!user) { // Se o usuário atualizou seu EMAIL, ele terá que realizar login novamente
      throw new Unauthorized('Invalid user, login again');
    }

    // id e email do usuário agora estão disponíveis e são conhecidos no sistema
    req.userId = id;
    req.userEmail = email;
    return next(); // Continua para a response

  } catch (err) {
    if(err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      throw new Unauthorized('Expired or invalid token');
    }
    next(err);
  }
};
