const wordsDashboard = document.querySelector(".words-dashboard");

let count = 1;
for (let i = 0; i < 30; i++) {
  const letterDiv = document.createElement("div");
  letterDiv.classList.add(`letter`);
  wordsDashboard.appendChild(letterDiv);
}

document.onkeyup = function (e) {
  const letterSpaces = document.querySelectorAll(".letter");
  if (count > letterSpaces.length) return;
  for (let i = 0; i < count; i++) {
    if (!letterSpaces[i].textContent) {
      letterSpaces[i].textContent = e.key.toUpperCase();
    }
  }
  count++;
};
