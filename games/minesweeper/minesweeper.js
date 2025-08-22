
const board = document.getElementById('msBoard');
const gameOverScreen = document.getElementById('gameOverScreen');
const replayBtn = document.getElementById('replayBtn');
const exitBtn = document.getElementById('exitBtn');

const size = 5;
let mines, cells;

function initGame() {
    board.innerHTML = '';
    mines = [];
    cells = [];
    while (mines.length < 5) {
        let r = Math.floor(Math.random() * size * size);
        if (!mines.includes(r)) mines.push(r);
    }
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('button');
        cell.className = 'msCell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => {
            if (mines.includes(i)) {
                cell.innerText = '💣';
                cell.style.background = 'red';
                setTimeout(gameOver, 300);
            } else {
                cell.innerText = '✔';
                cell.style.background = 'green';
                cell.disabled = true;
            }
        });
        board.appendChild(cell);
        cells.push(cell);
    }
}

function gameOver() {
    // Reveal all mines
    cells.forEach((cell, i) => {
        if (mines.includes(i)) {
            cell.innerText = '💣';
            cell.style.background = 'red';
        }
        cell.disabled = true;
    });
    gameOverScreen.style.opacity = '1';
    gameOverScreen.style.pointerEvents = 'auto';
    gameOverScreen.style.display = 'flex';
}

replayBtn.addEventListener('click', () => {
    gameOverScreen.style.opacity = '0';
    gameOverScreen.style.pointerEvents = 'none';
    setTimeout(() => {
        gameOverScreen.style.display = 'none';
        initGame();
    }, 300);
});

exitBtn.addEventListener('click', () => {
    window.location.href = '../../index.html';
});

// Hide game over screen at start
gameOverScreen.style.opacity = '0';
gameOverScreen.style.pointerEvents = 'none';
gameOverScreen.style.display = 'none';
initGame();
