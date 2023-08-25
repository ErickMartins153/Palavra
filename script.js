const wordsDashboard = document.querySelector(".words-dashboard");
for (let i = 0; i < 30; i++) {
  const letterDiv = document.createElement("div");
  letterDiv.classList.add(`letter-${i}`);
  letterDiv.textContent = i;
  wordsDashboard.appendChild(letterDiv);
}
