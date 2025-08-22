const container = document.getElementById('game-container');
const canvas = document.getElementById('gameCanvas');
canvas.width = 400;
canvas.height = 400;
container.appendChild(canvas);
const ctx = canvas.getContext('2d');

const gameOverScreen = document.getElementById('gameOverScreen');
const replayBtn = document.getElementById('replayBtn');
const exitBtn = document.getElementById('exitBtn');
const scoreDisplay = document.getElementById('scoreDisplay');
const finalScore = document.getElementById('finalScore');

let snake, food, dx, dy, intervalId, gameActive, score;

function initGame() {
    snake = [{ x: 200, y: 200 }];
    dx = 20;
    dy = 0;
    score = 0;
    gameActive = true;
    generateFood();
    gameOverScreen.style.opacity = '0';
    gameOverScreen.style.pointerEvents = 'none';
    gameOverScreen.style.display = 'none';
    scoreDisplay.innerText = `Score: ${score}`;
    finalScore.innerText = '';
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(draw, 150);
}

function generateFood() {
    // Ensure food does not spawn on snake
    let x, y;
    do {
        x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
        y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
    } while (snake.some(s => s.x === x && s.y === y));
    food = { x, y };
}

function draw() {
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
        generateFood();
    } else {
        snake.pop();
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);

    // Draw snake
    ctx.fillStyle = 'lime';
    snake.forEach((s, i) => {
        ctx.fillRect(s.x, s.y, 20, 20);
    });

    // Check collisions
    if (
        head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height ||
        snake.slice(1).some(s => s.x === head.x && s.y === head.y)
    ) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(intervalId);
    gameActive = false;
    gameOverScreen.style.opacity = '1';
    gameOverScreen.style.pointerEvents = 'auto';
    gameOverScreen.style.display = 'flex';
    gameOverScreen.querySelector('h2').innerText = `Game Over!`;
    finalScore.innerText = `Your Score: ${score}`;
}

document.addEventListener('keydown', e => {
    if (!gameActive) return;
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -20; }
    if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 20; }
    if (e.key === 'ArrowLeft' && dx === 0) { dx = -20; dy = 0; }
    if (e.key === 'ArrowRight' && dx === 0) { dx = 20; dy = 0; }
});

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
initGame();
