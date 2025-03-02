let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msgcon");
let turnX = true;
let gameOver = false;

const win = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return; // Stop clicking if the game is over

        box.innerText = turnX ? "X" : "O";
        box.disabled = true;
        turnX = !turnX;

        checkWinner();
    });
});

const resetGame = () => {
    turnX = true;
    gameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "WINNER"; // Reset the message text
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, ${winner} Won !!`;
    msgContainer.classList.remove("hide");
    gameOver = true;
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a Draw !!";
    msgContainer.classList.remove("hide");
    gameOver = true;
};

const checkWinner = () => {
    for (let p of win) {
        let [a, b, c] = p;
        let p1 = boxes[a].innerText;
        let p2 = boxes[b].innerText;
        let p3 = boxes[c].innerText;

        if (p1 !== "" && p1 === p2 && p2 === p3) {
            showWinner(p1);
            return;
        }
    }

    // If no winner and all boxes are filled, declare a draw
    if ([...boxes].every(box => box.innerText !== "")) {
        showDraw();
    }
};

reset.addEventListener("click", resetGame);
