function showGameOver() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.opacity = '1';
    gameOverScreen.style.pointerEvents = 'auto';
    gameOverScreen.style.display = 'flex';
}

function hideGameOver() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.opacity = '0';
    gameOverScreen.style.pointerEvents = 'none';
    setTimeout(() => {
        gameOverScreen.style.display = 'none';
    }, 300);
}

function initMemory() {
    const container = document.getElementById('game-container');
    container.innerHTML = '<div id="memoryBoard"></div>' +
        document.getElementById('gameOverScreen').outerHTML;
    const board = document.getElementById('memoryBoard');
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.opacity = '0';
    gameOverScreen.style.pointerEvents = 'none';
    gameOverScreen.style.display = 'none';

    // Emojis: fruits, animals, birds, fun icons
    let emojiList = [
        '🍎','🍌','🍇','🍉','🍒','🥝','🍍','🍓',   
        '🐶','🐱','🦁','🐯','🐸','🐵','🐼','🐨',   
        '🦅','🦉','🐦','🐧','🦆','🦢','🦜','🐤',   
        '🌞','⭐','⚡','🔥','💧','🌈','🌪️','❄️',   
        '🍎','🍌','🍇','🍉','🍒','🥝','🍍','🍓',
        '🦊','🦝','🐻','🐰','🦄','🐷','🐣','🕊️',
        '🐝','🦋','🐞','🦂','🕷️','🍊','🍋',
        '🐠','🐟','🐬','🦑','🦀','🐙','🦈','🐳'
    ];

    // Take 8 random emojis and duplicate for pairs (for 4x4 board)
    emojiList.sort(() => 0.5 - Math.random());
    let selected = emojiList.slice(0, 8);
    let cards = [...selected, ...selected]; // Duplicate for pairs
    cards.sort(() => 0.5 - Math.random());

    let first = null, second = null;
    let lock = false;
    let matchedCount = 0;

    cards.forEach(val => {
        const card = document.createElement('div');
        card.className = 'memoryCard';
        card.dataset.value = val;
        card.innerText = '?';

        card.addEventListener('click', () => {
            if (lock) return;
            if (card.innerText === '?') {
                card.innerText = val;
                if (!first) {
                    first = card;
                } else {
                    second = card;
                    lock = true;
                    setTimeout(() => {
                        if (first.dataset.value !== second.dataset.value) {
                            first.innerText = '?';
                            second.innerText = '?';
                        } else {
                            first.classList.add('matched');
                            second.classList.add('matched');
                            matchedCount += 2;
                            if (matchedCount === cards.length) {
                                setTimeout(showGameOver, 500);
                            }
                        }
                        first = null;
                        second = null;
                        lock = false;
                    }, 500);
                }
            }
        });

        board.appendChild(card);
    });

    // Add event listeners for Replay and Exit
    const replayBtn = document.getElementById('replayBtn');
    const exitBtn = document.getElementById('exitBtn');
    if (replayBtn && exitBtn) {
        replayBtn.onclick = () => {
            hideGameOver();
            setTimeout(initMemory, 300);
        };
        exitBtn.onclick = () => {
            window.location.href = '../../index.html';
        };
    }
}

// Initialize the game
initMemory();
