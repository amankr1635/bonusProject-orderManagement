const isValidEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

  const isValidName = function (name) {
    const nameRegex = /^[a-z A-Z_]{3,20}$/;
    return nameRegex.test(name);
  };

  
const isValidNo = function (number) {
    const validnumber = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
    // /^[6-9]\d{9}$/;
    return validnumber.test(number);
  };
  module.exports = {isValidEmail, isValidName, isValidNo}

  