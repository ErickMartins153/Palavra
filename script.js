const wordsDashboard = document.querySelector(".words-dashboard");

let count = 0;
for (let i = 0; i < 30; i++) {
  const letterDiv = document.createElement("div");
  letterDiv.classList.add("letter");
  wordsDashboard.appendChild(letterDiv);
}

document.onkeyup = function (e) {
  let limit = false;
  if (!isLetter(e.key) && e.key !== "Backspace") return;
  const letterSpaces = document.querySelectorAll(".letter");
  if (count >= 5) {
    limit = !limit;
    count--;
  }
  for (let i = 0; i <= count; i++) {
    if (e.key === "Backspace") {
      console.log(count, "dentro");
      if (!limit) {
        count--;
        limit = !limit;
      }
      if (count < 0) count = 0;
      letterSpaces[count].textContent = null;
      return;
    } else if (!letterSpaces[count].textContent) {
      letterSpaces[count].textContent = e.key.toUpperCase();
    }
  }
  count++;
  console.log(count, "fora");
};

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function submitWord(letterSpaces) {
  alert("eoq");
}
