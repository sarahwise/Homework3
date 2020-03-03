// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}
//pasword generatorfunction generatePassword() {

  window.addEventListener('load', function() {
    var length = prompt("How many characters would you like your password to be?");
  
    while (length < 8 || length > 128) {
      length = prompt("Length must be 8-128 characters. How many characters would you like your password to be?");
    }
  
    var upperCase = confirm("Would you like to use uppercase letters?");
    var lowerCase = confirm("Would you like to use lowercase letters?");
    var numbers = confirm("would you like to use numbers?");
    var symbols = confirm("would you like to use special characters?");
  
    while (!(upperCase || lowerCase || numbers || symbols)) {
      alert("ERROR: YOU MUST SELECT A CHARACTER TYPE");
  
      upperCase = confirm("Would you like to use uppercase letters?");
      lowerCase = confirm("Would you like to use lowercase letters?");
      numbers = confirm("would you like to use numbers?");
      symbols = confirm("would you like to use special characters?");
    }
  
    //DOM elements
    const resultEl = document.getElementById('password');
  
    document.getElementById('generate').addEventListener('click', () => {
      resultEl.value = generatePassword(lowerCase, upperCase, numbers, symbols, length);
    });
  
    document.getElementById('clipboard').addEventListener('click', () => {
      const textarea = document.createElement('textarea');
      const password = resultEl.value;
  
      if (!password) {
        return;
      }
  
      textarea.value = password;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      alert('Password copied to clipboard');
    });
  });
  
  
  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
  };
  
  function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{
      lower
    }, {
      upper
    }, {
      number
    }, {
      symbol
    }].filter(item => Object.values(item)[0]);
  
    // create a loop
    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }
  
    const finalPassword = generatedPassword.slice(0, length);
  
    return finalPassword;
  }
  
  // Generator functions
  function getRandomLower() {
    return rando("qwertyuiopasdfghjklzxcvbnm")
  }
  
  function getRandomUpper() {
    return rando("QWERTYUIOPASDFGHJKLZXCVBNM");
  }
  
  function getRandomNumber() {
    return rando(9);
  }
  
  function getRandomSymbol() {
    return rando('!@#$%^&*(){}[]=<>/,.');
  }


// Add event listener to generate button

generateBtn.addEventListener("click", writePassword);



