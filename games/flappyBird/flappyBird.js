const canvas = document.getElementById('gameCanvas');
canvas.width = 400;
canvas.height = 400;
const ctx = canvas.getContext('2d');

const gameOverScreen = document.getElementById('gameOverScreen');
const replayBtn = document.getElementById('replayBtn');
const exitBtn = document.getElementById('exitBtn');
const finalScore = document.getElementById('finalScore');
const scoreSpan = document.getElementById('score');
const levelSpan = document.getElementById('level');

let animationId;
let bird, gravity, pipes, score, level, pipeSpeed, gapSize;
let countdown = 3; // start countdown from 3

// Add a simple start overlay
const startScreen = document.createElement('div');
startScreen.style.position = 'absolute';
startScreen.style.top = '0';
startScreen.style.left = '0';
startScreen.style.width = '100%';
startScreen.style.height = '100%';
startScreen.style.display = 'flex';
startScreen.style.justifyContent = 'center';
startScreen.style.alignItems = 'center';
startScreen.style.fontSize = '4em';
startScreen.style.fontWeight = 'bold';
startScreen.style.color = 'white';
startScreen.style.zIndex = '10';
// startScreen.style.background = 'linear-gradient(135deg, #000428, #004e92)'; // black + blue gradient
startScreen.style.transition = 'background 0.5s';
startScreen.innerText = countdown;
document.body.appendChild(startScreen);

function initGame() {
    bird = { x: 50, y: 200, dy: 0 };
    gravity = 0.6;
    pipes = [{ x: 400, y: Math.random() * 200 + 50 }];
    score = 0;
    level = 1;
    pipeSpeed = 2;
    gapSize = 100;

    scoreSpan.innerText = score;
    levelSpan.innerText = level;

    gameOverScreen.style.opacity = '0';
    gameOverScreen.style.pointerEvents = 'none';
    gameOverScreen.style.display = 'none';
}

// Countdown before starting
function startCountdown() {
    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            startScreen.innerText = countdown;
        } else {
            startScreen.innerText = "Start!";
            setTimeout(() => {
                startScreen.style.display = 'none';
                draw(); // Start game
            }, 500);
            clearInterval(interval);
        }
    }, 1000);
}

function draw() {
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bird
    bird.dy += gravity;
    bird.y += bird.dy;
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(bird.x + 10, bird.y + 10, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Eye
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(bird.x + 14, bird.y + 6, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Pipes
    pipes.forEach(pipe => {
        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, 40, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + gapSize, 40, canvas.height - pipe.y - gapSize);
        pipe.x -= pipeSpeed;

        // Collision
        if (bird.x + 20 > pipe.x && bird.x < pipe.x + 40 &&
            (bird.y < pipe.y || bird.y + 20 > pipe.y + gapSize)) {
            gameOver();
            return;
        }

        // Reset pipe
        if (pipe.x < -40) {
            pipe.x = 400;
            pipe.y = Math.random() * 200 + 50;
            score++;
            scoreSpan.innerText = score;

            if (score % 5 === 0) {
                level++;
                pipeSpeed += 0.5;
                gapSize -= 5;
                levelSpan.innerText = level;
            }
        }
    });

    // Floor collision
    if (bird.y > canvas.height - 20 || bird.y < 0) {
        gameOver();
        return;
    }

    animationId = requestAnimationFrame(draw);
}

// Jump
document.addEventListener('keydown', () => {
    bird.dy = -8;
});

// Game Over
function gameOver() {
    cancelAnimationFrame(animationId);
    finalScore.innerText = "Your Score: " + score;
    gameOverScreen.style.opacity = '1';
    gameOverScreen.style.pointerEvents = 'auto';
    gameOverScreen.style.display = 'flex';
}

// Replay
replayBtn.addEventListener('click', () => {
    gameOverScreen.style.opacity = '0';
    gameOverScreen.style.pointerEvents = 'none';
    setTimeout(() => {
        gameOverScreen.style.display = 'none';
        initGame();
        countdown = 3; // Reset countdown
        startScreen.style.display = 'flex';
        startScreen.innerText = countdown;
        startCountdown();
    }, 300);
});

// Exit
exitBtn.addEventListener('click', () => {
    window.location.href = '../../index.html';
});

// Initialize
initGame();
startCountdown();
