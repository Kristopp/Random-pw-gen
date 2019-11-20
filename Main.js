const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEL = document.getElementById("upperCase");
const lowercaseEL = document.getElementById("lowerCase");
const numbersEL = document.getElementById("numbers");
const generateEl = document.getElementById("generate");
const symbolsEl = document.getElementById("symbols");
const clipboardEl = document.getElementById("clipboard");

//Object of functsions
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbols: getRandomSymbols
};

//settings work using bolean if it is true use it
generateEl.addEventListener("click", () => {
    const length = lengthEl.value;
  const hasLower = lowercaseEL.checked;
  const hasUpper = uppercaseEL.checked;
  const hasNumber = numbersEL.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
  clipboardEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;

    if (!password) {
      return;
    }
    
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("pw copied");
  });

  function generatePassword(lower, upper, number, symbols, length) {
    //1. Create var for pw
    //2.filter out unchecked setings
    //3.Loop over length call generator function for each type
    //4.Add final pw to the pw cont and

    let generatedPassword = "";

    const typesCount = lower + upper + number + symbols;

    /**we will filter out false checkbox
     * i want lower ,upper ,number ,symbols as object keys
     *
     */

    const typeArr = [{ lower }, { upper }, { number }, { symbols }].filter(
      item => Object.values(item)[0]
    );

    if (typesCount === 0) {
      return alert(" Pls select at least 1 setting");
    }

    /**Loop through  */

    for (let i = 0; i < length; i += typesCount) {
      typeArr.forEach(type => {
        //we want to get our fucntion name = key

        const funcName = Object.keys(type)[0];

        //generated password = randomFunc(function call)
        generatedPassword += randomFunc[funcName]();
      });
    }

    //slice from beginning so Password length would work properly

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
  }
});

/*Il create functions for generating password*/
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomSymbols() {
  const symbols = '!"£$%^&()_+=-`';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
