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
  const before = count;
  history.push(`${value > 0 ? '+' : ''}${value} (${before} -> ${before + value})`);
  redoStack = [];
  count += value;
  updateDisplay();
}

function undo() {
  if (history.length > 0) {
    redoStack.push(history.pop());
    count = extractCountFromHistory(history[history.length - 1]) || 0;
    updateDisplay();
  }
}

function redo() {
  if (redoStack.length > 0) {
    const redoEntry = redoStack.pop();
    history.push(redoEntry);
    count = extractCountFromHistory(redoEntry);
    updateDisplay();
  }
}

function extractCountFromHistory(entry) {
  if (!entry) return 0;
  const match = entry.match(/-> (-?\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function updateDisplay() {
  countDisplay.textContent = count;
  updateHistory();
}

function updateHistory() {
  historyList.innerHTML = history.map(value => `<li>${value}</li>`).join("");
}

updateDisplay();
