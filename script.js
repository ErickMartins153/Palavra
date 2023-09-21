async function init() {
  const wordsDashboard = document.querySelector(".words-dashboard");
  for (let i = 0; i < 30; i++) {
    const letterDiv = document.createElement("div");
    letterDiv.classList.add("letter");
    letterDiv.classList.add(`element-${i}`);
    wordsDashboard.appendChild(letterDiv);
  }
  const resultText = document.createElement("div");
  resultText.classList.add("result");
  resultText.textContent = "Result";
  document.body.appendChild(resultText);

  const letterSpaces = document.querySelectorAll(".letter");
  const dailyWordAPI = "https://words.dev-apis.com/word-of-the-day?random=1";
  const validateWordAPI = "https://words.dev-apis.com/validate-word";
  let word = "";
  let count = 0;
  let won = false;
  let lose = false;
  let isValid = null;
  let currentRow = 0;
  const promise = await fetch(dailyWordAPI);
  const { word: dailyWord } = await promise.json();
  let todaysWord = dailyWord.toUpperCase();

  async function validateWord(userWord) {
    const promiseValidation = await fetch(validateWordAPI, {
      method: "POST",
      body: JSON.stringify({ word: userWord }),
    });
    const { validWord } = await promiseValidation.json();
    if (validWord) {
      setvalid(true);
    } else {
      setvalid(false);
    }

    submitWord(userWord);
  }
  function setvalid(state) {
    isValid = state;
    for (let i = 0; i < word.length; i++) {
      if (!isValid) {
        letterSpaces[i + currentRow].classList.remove("invalid");
        //forces browser to notice that the class was removed and then added again
        void letterSpaces[i + currentRow].offsetWidth;

        letterSpaces[i + currentRow].classList.add("invalid");
      } else {
        letterSpaces[i + currentRow].classList.remove("invalid");
      }
    }
  }
  document.onkeyup = function (e) {
    let limit = false;
    if (won || lose) return;
    if (!isLetter(e.key) && e.key !== "Backspace" && e.key !== "Enter") return;
    if (e.key === "Enter") {
      if (count !== 5) return;
      validateWord(word);
    }
    if (count >= 5) {
      limit = !limit;
      count--;
    }
    for (let i = currentRow; i <= count + currentRow; i++) {
      let letter = e.key.toUpperCase();
      if (e.key === "Backspace") {
        if (!limit) {
          count--;
          limit = !limit;
        }
        if (count < 0) count = 0;
        letterSpaces[count + currentRow].textContent = null;
        word = word.slice(0, word.length - 1);
        return;
      } else if (!letterSpaces[count + currentRow].textContent) {
        letterSpaces[count + currentRow].textContent = letter;
        word += letter;
      }
    }
    count++;
  };

  function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

  function submitWord() {
    if (letterSpaces[currentRow].classList.contains("invalid")) {
      for (let i = currentRow; i < count + currentRow; i++) {
        letterSpaces[i].classList.remove("correct", "wrong-place");
      }
      return;
    }
    let correctPlace = {};
    let wrongPlaceValue = [];
    let wrongPlace = {};
    if (count < 5) return;
    if (word === todaysWord && !won) {
      won = !won;
      resultText.textContent = "You Won!";
      playAgain();
    }
    if (count + currentRow >= letterSpaces.length && !lose && !won) {
      lose = true;
      resultText.textContent = `You Lose! The word was: ${todaysWord}`;
      playAgain();
    }
    let wordSplit = word.split("");
    let todaysWordSplit = todaysWord.split("");
    let commonLetters = todaysWordSplit.filter((letter) => {
      return wordSplit.includes(letter);
    });
    for (let i = 0; i < wordSplit.length; i++) {
      if (wordSplit[i] === todaysWordSplit[i]) {
        correctPlace[i + currentRow] = wordSplit[i];
      }

      wrongPlaceValue = commonLetters.filter((letter) => {
        if (
          commonLetters.indexOf(letter) !== commonLetters.lastIndexOf(letter)
        ) {
          return +Object.keys(correctPlace) === wordSplit.indexOf(letter)
            ? wordSplit.lastIndexOf(letter) + currentRow
            : wordSplit.indexOf(letter) + currentRow;
        }
        return commonLetters;
      });
    }

    for (let i = 0; i < wordSplit.length; i++) {
      let indexFirstOccurrence = wordSplit.indexOf(wrongPlaceValue[i]);
      if (indexFirstOccurrence !== -1) {
        wrongPlace[indexFirstOccurrence + currentRow] =
          wordSplit[indexFirstOccurrence];
        wordSplit.splice(indexFirstOccurrence, 1, null);
      }
    }

    handleLetters(correctPlace, wrongPlace);
  }
  function handleLetters(correctPlace, wrongPlace) {
    const correctPlaceKeys = Object.keys(correctPlace);
    const wrongplaceKeys = Object.keys(wrongPlace);
    const letterDivs = document.querySelectorAll(".letter");
    for (let i = currentRow; i < count + currentRow; i++) {
      letterDivs[i].classList.remove("correct", "wrong", "wrong-place");
    }

    for (let i = 0; i < wrongplaceKeys.length; i++) {
      document
        .querySelector(`.element-${wrongplaceKeys[i]}`)
        .classList.remove("invalid", "correct");
      document
        .querySelector(`.element-${wrongplaceKeys[i]}`)
        .classList.add("wrong-place");
    }
    for (let i = 0; i < correctPlaceKeys.length; i++) {
      document
        .querySelector(`.element-${correctPlaceKeys[i]}`)
        .classList.remove("wrong-place", "invalid");
      document
        .querySelector(`.element-${correctPlaceKeys[i]}`)
        .classList.add("correct");
    }
    currentRow += 5;
    count = 0;
    word = "";
    limit = false;
  }

  function playAgain() {
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    document.body.appendChild(playAgainButton);
    playAgainButton.onclick = refreshPage;
  }

  function refreshPage() {
    return location.reload();
  }
}
init();
