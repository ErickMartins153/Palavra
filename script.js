async function init() {
  const wordsDashboard = document.querySelector(".words-dashboard");
  for (let i = 0; i < 30; i++) {
    const letterDiv = document.createElement("div");
    letterDiv.classList.add("letter");
    letterDiv.classList.add(`element-${i}`);
    wordsDashboard.appendChild(letterDiv);
  }
  const letterSpaces = document.querySelectorAll(".letter");
  const dailyWordAPI = "https://words.dev-apis.com/word-of-the-day";
  const validateWordAPI = "https://words.dev-apis.com/validate-word";
  let word = "";
  let count = 0;
  let won = false;
  const promise = await fetch(dailyWordAPI);
  const { word: dailyWord } = await promise.json();
  let todaysWord = dailyWord.toUpperCase();

  document.onkeyup = function (e) {
    let limit = false;
    if (!isLetter(e.key) && e.key !== "Backspace" && e.key !== "Enter") return;
    if (e.key === "Enter") return submitWord();
    if (count >= 5) {
      limit = !limit;
      count--;
    }
    for (let i = 0; i <= count; i++) {
      let letter = e.key.toUpperCase();
      if (e.key === "Backspace") {
        if (!limit) {
          count--;
          limit = !limit;
        }
        if (count < 0) count = 0;
        letterSpaces[count].textContent = null;
        word = word.slice(0, word.length - 1);
        return;
      } else if (!letterSpaces[count].textContent) {
        letterSpaces[count].textContent = letter;
        word += letter;
      }
    }
    count++;
  };

  function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

  function submitWord() {
    let correctPlace = {};
    let wrongPlaceValue = [];
    let wrongPlace = {};
    let wrongLetters = [];
    todaysWord = "TESTA";
    if (count < 5) return;
    if (word === todaysWord && !won) {
      won = !won;
      return alert("You won!");
    }
    let wordSplit = word.split("");
    let todaysWordSplit = todaysWord.split("");
    let commonLetters = todaysWordSplit.filter((letter) => {
      return wordSplit.includes(letter);
    });
    for (let i = 0; i < wordSplit.length; i++) {
      if (wordSplit[i] === todaysWordSplit[i]) {
        correctPlace[i] = wordSplit[i];
      }
      wrongLetters = wordSplit.filter(
        (letter) => !commonLetters.includes(letter)
      );
      wrongPlaceValue = commonLetters.filter((letter) => {
        return (wrongPlaceValue =
          !Object.values(correctPlace).includes(letter));
      });
    }
    for (let i = 0; i < wordSplit.length; i++) {
      let indexFirstOccurrence = wordSplit.indexOf(wrongPlaceValue[i]);
      if (indexFirstOccurrence !== -1) {
        wrongPlace[indexFirstOccurrence] = wordSplit[indexFirstOccurrence];
        wordSplit.splice(indexFirstOccurrence, 1, null);
      }
    }
    handleLetters(correctPlace, wrongPlace);
  }
  function handleLetters(correctPlace, wrongPlace) {
    const correctPlaceKeys = Object.keys(correctPlace);
    for (let i = 0; i < correctPlaceKeys.length; i++) {
      document
        .querySelector(`.element-${correctPlaceKeys[i]}`)
        .classList.add("correct");
    }

    async function validateWord() {
      const promise = await fetch(validateWordAPI);
      const processedResponse = await promise.json();
    }
  }
}
init();
