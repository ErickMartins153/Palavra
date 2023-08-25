const wordsDashboard = document.querySelector(".words-dashboard");

let count = 1;
for (let i = 0; i < 30; i++) {
  const letterDiv = document.createElement("div");
  letterDiv.classList.add("letter");
  wordsDashboard.appendChild(letterDiv);
}

document.onkeyup = function (e) {
  if (!isLetter(e.key) && e.key !== "Backspace") return;
  const letterSpaces = document.querySelectorAll(".letter");
  if (count > 5) {
    count = 5;
  }
  for (let i = 0; i < count; i++) {
    if (e.key === "Backspace") {
      count--;
      if (count < 1) count = 0;
      letterSpaces[count].textContent = null;
      return;
    } else if (!letterSpaces[i].textContent) {
      letterSpaces[i].textContent = e.key.toUpperCase();
    }
  }
  count++;
};

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
