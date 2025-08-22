const canvas = document.getElementById('gameCanvas');
canvas.width = 400;
canvas.height = 300;
const ctx = canvas.getContext('2d');

const gameOverScreen = document.getElementById('gameOverScreen');
const replayBtn = document.getElementById('replayBtn');
const exitBtn = document.getElementById('exitBtn');

let animationId;
let ball, paddle;
let score;

function initGame() {
    ball = { x: 200, y: 150, dx: 3, dy: 3, r: 10 };
    paddle = { x: 160, y: 280, w: 80, h: 10 };
    score = 0;
}

function draw() {
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.x < ball.r || ball.x > canvas.width - ball.r) ball.dx *= -1;
    if (ball.y < ball.r) ball.dy *= -1;
    if (ball.y > canvas.height - ball.r) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
            ball.dy *= -1;
            score++;
        } else {
            gameOver();
            return;
        }
    }
    ctx.fillStyle = "lime";
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
    // Draw score
    ctx.fillStyle = "#fff";
    ctx.font = "18px Arial";
    ctx.fillText(`Score: ${score}`, 10, 25);
    animationId = requestAnimationFrame(draw);
}

document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    paddle.x = e.clientX - rect.left - paddle.w / 2;
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x > canvas.width - paddle.w) paddle.x = canvas.width - paddle.w;
});

function gameOver() {
    cancelAnimationFrame(animationId);
    gameOverScreen.style.opacity = '1';
    gameOverScreen.style.pointerEvents = 'auto';
    gameOverScreen.style.display = 'flex';
    gameOverScreen.querySelector('h2').innerText = `Game Over! Score: ${score}`;
}

replayBtn.addEventListener('click', () => {
    gameOverScreen.style.opacity = '0';
    gameOverScreen.style.pointerEvents = 'none';
    setTimeout(() => {
        gameOverScreen.style.display = 'none';
        initGame();
        draw();
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
draw();
