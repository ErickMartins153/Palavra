async function init() {
  const wordsDashboard = document.querySelector(".words-dashboard");
  const dailyWordAPI = "https://words.dev-apis.com/word-of-the-day";
  const validateWordAPI = "https://words.dev-apis.com/validate-word";
  let word = "";
  let count = 0;
  const promise = await fetch(dailyWordAPI);
  const { word: dailyWord } = await promise.json();
  let todaysWord = dailyWord.toUpperCase();

  for (let i = 0; i < 30; i++) {
    const letterDiv = document.createElement("div");
    letterDiv.classList.add("letter");
    wordsDashboard.appendChild(letterDiv);
  }

  document.onkeyup = function (e) {
    let limit = false;
    if (!isLetter(e.key) && e.key !== "Backspace" && e.key !== "Enter") return;
    const letterSpaces = document.querySelectorAll(".letter");
    if (e.key === "Enter") return submitWord(letterSpaces);
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
        word = word.slice(0, word.length - 2);
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

  function submitWord(letterSpaces) {
    if (count < 5) return;
    if (word === todaysWord) return alert("You won!");
    let wordSplit = word.split("");
    let todaysWordSplit = todaysWord.split("");
    let commonLetters = todaysWordSplit.filter((letter) =>
      wordSplit.includes(letter)
    );
    console.log(commonLetters);
  }

  async function validateWord() {
    const promise = await fetch(validateWordAPI);
    const processedResponse = await promise.json();
  }
}
init();
