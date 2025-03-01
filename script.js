let count = 0;
let history = [];
let redoStack = [];

const countDisplay = document.getElementById("count");
const historyList = document.getElementById("history");

document.querySelectorAll(".increment, .decrement").forEach(button => {
  button.addEventListener("click", () => {
    const value = parseInt(button.getAttribute("data-value"));
    updateCounter(value);
  });
});

document.getElementById("undo").addEventListener("click", undo);
document.getElementById("redo").addEventListener("click", redo);

function updateCounter(value) {
  history.push(count);
  redoStack = [];
  count += value;
  updateDisplay();
}

function undo() {
  if (history.length > 0) {
    redoStack.push(count);
    count = history.pop();
    updateDisplay();
  }
}

function redo() {
  if (redoStack.length > 0) {
    history.push(count);
    count = redoStack.pop();
    updateDisplay();
  }
}

function updateDisplay() {
  countDisplay.textContent = count;
  updateHistory();
}

function updateHistory() {
  historyList.innerHTML = history.map(value => `<li>${value}</li>`).join("");
}

updateDisplay();
