// Aqui são definidos os erros que podemos utilizar na aplicação

class GeneralError extends Error { // Obtem a mensagem e o código de status
    constructor(message, name, code = 500) {
      super();
      this.message = message;
      this.name = name;
      this.code = code;
    }
  }
  
  class BadRequest extends GeneralError {
    constructor(message, name) {
      super(message, name, 400);
      this.message = message || 'Invalid requisition';
      this.name = 'BadRequest';
    }
  }
  class NotFound extends GeneralError {
    constructor(message, name) {
      super(message, name, 404);
      this.message = message || 'Resource not found';
      this.name = 'NotFound';
    }
  }
  
  class Unauthorized extends GeneralError {
    constructor(message, name) {
      super(message, name, 401);
      this.message = message || 'Access is allowed only for registered users';
      this.name = 'Unauthorized'
    }
  }
  
  // class Conflict extends GeneralError {
  //   constructor(message, name) {
  //     super(message, name, 409);
  //     this.message = message || 'Resource already exists';
  //     this.name = 'Conflict';
  //   }
  // }
  
  module.exports = {
    GeneralError,
    BadRequest,
    NotFound,
    Unauthorized,
    // Conflict
  };
  