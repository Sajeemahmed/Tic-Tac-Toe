// Selecting elements from the DOM
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-game");
let drawContainer = document.querySelector(".draw-container");
let msgDraw = document.querySelector("#msg-draw");

let turnO = true;
let count = 0;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

// Function to reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  drawContainer.classList.add("hide");
};

// Add click event listeners to each box
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return; // Avoid overwriting box content

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    count++;
    box.disabled = true;
    checkWinner();
  });
});

// Function to disable all boxes
const disableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = true;
  });
};

// Function to enable all boxes and clear their content
const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Function to show the winner message
const showWinner = (winner) => {
  msg.innerHTML = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to show the draw message
const showDraw = () => {
  msgDraw.innerHTML = "It's a draw!";
  drawContainer.classList.remove("hide");
  disableBoxes();
};

// Function to check for a winner or draw
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (boxes[a].innerText !== "" && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
      showWinner(boxes[a].innerText);
      return;
    }
  }
  if (count === 9) {
    showDraw();
  }
};

// Adding event listeners to reset and new game buttons
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

// Initial call to reset the game
resetGame();
