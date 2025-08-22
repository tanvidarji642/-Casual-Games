const container = document.getElementById('game-container');
const canvas = document.getElementById('gameCanvas');
canvas.width = 400;
canvas.height = 300;
const ctx = canvas.getContext('2d');

const gameOverScreen = document.getElementById('gameOverScreen');
const replayBtn = document.getElementById('replayBtn');
const exitBtn = document.getElementById('exitBtn');

let animationId;

// Ball and paddle
let ball, paddle, bricks;
const row = 3, col = 5;

function initGame() {
    ball = { x: 200, y: 150, dx: 3, dy: -3, r: 10 };
    paddle = { x: 150, y: 280, w: 100, h: 10 };

    // Initialize bricks
    bricks = [];
    for (let r = 0; r < row; r++) {
        bricks[r] = [];
        for (let c = 0; c < col; c++) {
            bricks[r][c] = { x: c * 75 + 10, y: r * 30 + 10, w: 70, h: 20, status: 1 };
        }
    }
}

// Draw function
function draw() {
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ball
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collisions
    if (ball.x < ball.r || ball.x > canvas.width - ball.r) ball.dx *= -1;
    if (ball.y < ball.r) ball.dy *= -1;

    // Paddle collision / Game Over
    if (ball.y > canvas.height - ball.r) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
            ball.dy *= -1;
        } else {
            gameOver();
            return;
        }
    }

    // Paddle
    ctx.fillStyle = "lime";
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);

    // Bricks
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            let b = bricks[r][c];
            if (b.status) {
                ctx.fillStyle = "orange";
                ctx.fillRect(b.x, b.y, b.w, b.h);

                if (ball.x > b.x && ball.x < b.x + b.w && ball.y - ball.r < b.y + b.h && ball.y + ball.r > b.y) {
                    ball.dy *= -1;
                    b.status = 0;
                }
            }
        }
    }

    animationId = requestAnimationFrame(draw);
}

// Mouse control
canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    paddle.x = e.clientX - rect.left - paddle.w / 2;
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x > canvas.width - paddle.w) paddle.x = canvas.width - paddle.w;
});

// Game Over
function gameOver() {
    cancelAnimationFrame(animationId);
    gameOverScreen.style.opacity = '1';
    gameOverScreen.style.pointerEvents = 'auto';
    gameOverScreen.style.display = 'flex';
}

// Replay button
replayBtn.addEventListener('click', () => {
    gameOverScreen.style.opacity = '0';
    gameOverScreen.style.pointerEvents = 'none';
    setTimeout(() => {
        gameOverScreen.style.display = 'none';
        initGame();      // Reset ball, paddle, bricks
        draw();          // Start drawing again
    }, 300);
});

// Exit button
exitBtn.addEventListener('click', () => {
    window.location.href = '../../index.html';
});

// Initialize first game
// Hide game over screen at start
gameOverScreen.style.opacity = '0';
gameOverScreen.style.pointerEvents = 'none';
gameOverScreen.style.display = 'none';
initGame();
draw();
